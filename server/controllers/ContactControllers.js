import mongoose from 'mongoose';
import User from '../models/UserModel.js';
import Message from '../models/MessageModel.js';

export const getAllContacts = async (req, res, next) => {
  try {
    const users = await User.find(
      { _id: { $ne: req.id } },
      'firstName lastName _id',
    );

    const contacts = users.map((user) => ({
      label: `${user.firstName} ${user.lastName}`,
      value: user._id,
    }));

    return res.status(200).json({ contacts });
  } catch (error) {
    console.log({ error });
    return res.status(500).send('Internal Server Error.');
  }
};

export const searchContacts = async (req, res, next) => {
  try {
    const { searchTerm } = req.body;

    if (searchTerm === undefined || searchTerm === null) {
      return res.status(400).send('Search Term is required.');
    }

    const sanitizedSearchTerm = searchTerm.replace(
      /[.*+?^${}()|[\]\\]/g,
      '\\$&',
    );

    const regex = new RegExp(sanitizedSearchTerm, 'i');

    const contacts = await User.find({
      $and: [
        { id: { $ne: req.id } },
        {
          $or: [{ firstName: regex }, { lastName: regex }, { email: regex }],
        },
      ],
    });
    return res.status(200).json({ contacts });
  } catch (error) {
    console.log({ error });
    return res.status(500).send('Internal Server Error.');
  }
};

export const getContactsForList = async (req, res, next) => {
  try {
    let { id } = req;

    id = new mongoose.Types.ObjectId(id);

    if (!id) {
      return res.status(400).send('User ID is required.');
    }
    const contacts = await Message.aggregate([
      {
        $match: {
          $or: [{ sender: id }, { recipient: id }],
        },
      },
      {
        $sort: { timestamp: -1 },
      },
      {
        $group: {
          _id: {
            $cond: {
              if: { $eq: ['$sender', id] },
              then: '$recipient',
              else: '$sender',
            },
          },
          lastMessageTime: { $first: '$timestamp' },
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'contactInfo',
        },
      },
      {
        $unwind: '$contactInfo',
      },
      {
        $project: {
          _id: 1,

          lastMessageTime: 1,
          email: '$contactInfo.email',
          firstName: '$contactInfo.firstName',
          lastName: '$contactInfo.lastName',
          image: '$contactInfo.image',
          color: '$contactInfo.color',
        },
      },
      {
        $sort: { lastMessageTime: -1 },
      },
    ]);

    return res.status(200).json({ contacts });
  } catch (error) {
    console.error('Error getting user contacts:', error);
    return res.status(500).send('Internal Server Error');
  }
};
