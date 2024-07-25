import Message from '../models/MessageModel.js';
import { mkdirSync, renameSync } from 'fs';

export const getMessages = async (req, res, next) => {
  try {
    const user1 = req.id;
    const user2 = req.body.id;
    if (!user1 || !user2) {
      return res.status(400).send('Both user IDs are required.');
    }

    const messages = await Message.find({
      $or: [
        { sender: user1, recipient: user2 },
        { sender: user2, recipient: user1 },
      ],
    }).sort({ timestamp: 1 });

    return res.status(200).json({ messages });
  } catch (err) {
    console.log(err);
    return res.status(500).send('Internal Server Error');
  }
};

export const uploadFile = async (req, res, next) => {
  try {
    if (req.file) {
      const date = Date.now();
      let fileDir = `uploads/files/${date}`;
      let fileName = `${fileDir}/${req.file.originalname}`;

      // Create directory if it doesn't exist
      mkdirSync(fileDir, { recursive: true });

      renameSync(req.file.path, fileName);
      return res.status(200).json({ filePath: fileName });
    } else {
      return res.status(404).send('File is required.');
    }
  } catch (error) {
    console.log({ error });
    return res.status(500).send('Internal Server Error.');
  }
};
