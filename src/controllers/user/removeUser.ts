import { Request, Response } from 'express';
import { User } from '../../schemas';
import mongoose from 'mongoose';

const removeUserById = async (req: Request, res: Response) => {
  try {
    const { User_id, sessionID } = res.locals

    const db = mongoose.connection;
    const Session = db.collection('sessions');
    await Session.findOneAndDelete({ _id: sessionID });

    const user = await User.findByIdAndUpdate(User_id, { isActive: false }, { new: true })
    if (!user) return res.status(404).json({ message: 'The user not found' })

    if (!user?.isActive) return res.status(200).json({ message: 'User deleted successfully' })
    else res.status(404).json({ message: 'The user could not be deleted' })

  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error });
  }
};

export default removeUserById;
