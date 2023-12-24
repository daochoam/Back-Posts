import mongoose from 'mongoose';
import { Request, Response, NextFunction } from "express";
import { handlerDecodeTokenIDSession } from "../handlers";

const verifyUserSession = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log('here')
    let token: string | undefined = req.headers['authorization'];

    if (!token) {
      return res.status(401).json({ message: 'Missing authorization token' });
    }

    if (token.startsWith('Bearer ')) {
      token = token.split(' ')[1];
    }

    const sessionID: string = handlerDecodeTokenIDSession(token);
    if (!sessionID) {
      return res.status(401).json({ message: 'Missing authorization token' });
    }

    const db = mongoose.connection;
    const Session = db.collection<any>('sessions');
    const { session: { auth } } = await Session.findOne({ _id: sessionID });

    if (auth === null) {
      return res.status(401).json({ message: 'Session not found or not authorized' });
    }

    res.locals = {
      sessionID,
      ...auth
    }
    console.log("🚀 ~ file: validateUserSession.ts:34 ~ validateUserSession ~ res.locals:", res.locals)

    next();
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

export default verifyUserSession;
