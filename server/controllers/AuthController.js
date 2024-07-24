import { compare } from 'bcrypt';
import User from '../models/UserModel.js';
import jwt from 'jsonwebtoken';
import { renameSync, unlinkSync } from 'fs';

const maxAge = 3 * 24 * 60 * 60 * 1000;

const createToken = (email, id) => {
  return jwt.sign({ email, id }, process.env.JWT_KEY, {
    expiresIn: maxAge,
  });
};

export const signUp = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send('Email and password are required');
    }
    const user = await User.create({ email, password });
    res.cookie('jwt', createToken(user.email, user.id), {
      maxAge,
      secure: true,
      sameSite: 'None',
    });
    return res.status(201).json({
      user: {
        email: user.email,
        id: user.id,
        // firstName: user.firstName,
        // lastName: user.lastName,
        // image: user.image,
        profileSetup: user.profileSetup,
      },
    });
  } catch (error) {
    console.log({ error });
    return res.status(500).send('Internal server error');
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send('Email and password are required');
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send('User not found');
    }

    const auth = await compare(password, user.password);
    if (!auth) {
      return res.status(404).send('Password is incorrect');
    }
    res.cookie('jwt', createToken(user.email, user.id), {
      maxAge,
      secure: true,
      sameSite: 'None',
    });
    return res.status(200).json({
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        image: user.image,
        profileSetup: user.profileSetup,
        color: user.color,
      },
    });
  } catch (error) {
    console.log({ error });
    return res.status(500).send('Internal server error');
  }
};

export const logout = async (req, res, next) => {
  try {
    res.cookie('jwt', '', { maxAge: 1, secure: true, sameSite: 'None' });
    return res.status(200).send('Logout successful');
  } catch (err) {
    return res.status(500).send('Internal Server Error');
  }
};

export const getUserInfo = async (req, res, next) => {
  try {
    const user = await User.findById(req.id);
    if (!user) {
      return res.status(404).send('User with given id not found.');
    }
    return res.status(200).json({
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      image: user.image,
      profileSetup: user.profileSetup,
      color: user.color,
    });
  } catch (error) {
    console.log({ error });
    return res.status(500).send('Internal server error');
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const { id } = req;

    const { firstName, lastName, color } = req.body;

    if (!id) {
      return res.status(400).send('User ID is required.');
    }

    if (!firstName || !lastName) {
      return res.status(400).send('First name and Last name is required.');
    }

    const userData = await User.findByIdAndUpdate(
      id,
      {
        firstName,
        lastName,
        color,
        profileSetup: true,
      },
      {
        new: true,
        runValidators: true,
      },
    );
    return res.status(200).json({
      id: userData.id,
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      image: userData.image,
      profileSetup: userData.profileSetup,
      color: userData.color,
    });
  } catch (error) {
    return res.status(500).send('Internal Server Error.');
  }
};

export const addProfileImage = async (req, res, next) => {
  try {
    if (req.file) {
      const date = Date.now();
      let fileName = 'uploads/profiles/' + date + req.file.originalname;
      renameSync(req.file.path, fileName);
      const updatedUser = await User.findByIdAndUpdate(
        req.id,
        { image: fileName },
        {
          new: true,
          runValidators: true,
        },
      );
      return res.status(200).json({ image: updatedUser.image });
    } else {
      return res.status(404).send('File is required.');
    }
  } catch (error) {
    console.log({ error });
    return res.status(500).send('Internal Server Error.');
  }
};

export const removeProfileImage = async (req, res, next) => {
  try {
    const { id } = req;

    if (!id) {
      return res.status(400).send('User ID is required.');
    }

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).send('User not found.');
    }

    if (user.image) {
      unlinkSync(user.image);
    }

    user.image = null;
    await user.save();

    return res
      .status(200)
      .json({ message: 'Profile image removed successfully.' });
  } catch (error) {
    console.log({ error });
    return res.status(500).send('Internal Server Error.');
  }
};
