import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { handlerTokenIdSession } from '../../handlers';
import { User } from '../../schemas';

const signIn = async (req: Request & { session: CustomSession }, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(403).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ email: email, isActive: true });

    if (!user) {
      return res.status(403).json({ message: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(403).json({ message: 'Invalid password' });
    }

    const idSession = req.sessionID;
    const tokenSession = handlerTokenIdSession(idSession)

    req.session.auth = {
      User_id: user._id,
      email: user.email,
    };

    return res.status(200).json({
      token: tokenSession,
      ...req.session.auth,
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error: error });
  }
};

export default signIn;
