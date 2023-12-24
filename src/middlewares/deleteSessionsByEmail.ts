import mongoose from 'mongoose';
import { Request, Response, NextFunction } from "express";

const deleteSessionsByEmail = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = req.body;

    const db = mongoose.connection;
    const Session = db.collection('sessions');
    await Session.deleteMany({ 'session.auth.email': email })
    next()
  } catch (error) {
    res.status(500).json({ error: error })
  }
}

export default deleteSessionsByEmail