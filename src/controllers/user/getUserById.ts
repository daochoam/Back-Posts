import { Request, Response } from 'express';
import { User } from '../../schemas';

const getUserById = async (req: Request, res: Response) => {
  try {
    const { User_id } = res.locals;

    if (!User_id) return res.status(401).json({ message: 'User Unauthorized' })

    const user = await User.findById(User_id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ message: 'User found successfully', data: user });

  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error });
  }
};

export default getUserById;
