import { Request, Response } from 'express'
import { User } from '../../schemas'
import mongoose from 'mongoose';

const signOut = async (req: Request, res: Response) => {
  try {
    const { sessionID } = res.locals;

    const db = mongoose.connection;
    const Session = db.collection('sessions');
    const deletedSession = await Session.findOneAndDelete({ _id: sessionID });

    if (deletedSession) return res.status(200).json({ message: 'Sign out successfully' })
    else return res.status(400).json({ message: 'Session not found' })

  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error });
  }
}

export default signOut