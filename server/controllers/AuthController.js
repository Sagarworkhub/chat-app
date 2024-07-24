import { compare } from 'bcrypt';
import User from '../models/UserModel.js';
import jwt from 'jsonwebtoken';

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

export const updateProfile = async (request, response, next) => {
  try {
    const { id } = request;

    const { firstName, lastName, color } = request.body;

    if (!id) {
      return response.status(400).send('User ID is required.');
    }

    if (!firstName || !lastName) {
      return response.status(400).send('First name and Last name is required.');
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
    return response.status(200).json({
      id: userData.id,
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      image: userData.image,
      profileSetup: userData.profileSetup,
      color: userData.color,
    });
  } catch (error) {
    return response.status(500).send('Internal Server Error.');
  }
};
