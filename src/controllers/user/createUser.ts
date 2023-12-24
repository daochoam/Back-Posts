import { Request, Response } from 'express';
import { User } from '../../schemas';

const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, age } = req.body

    if (!name || !age || !email) return res.status(400).json({ message: 'Missing required fields' });

    const isUser = await User.findOne({ email: email })
    if (!isUser) return res.status(404).json({ message: 'User already exists' });

    const user = await User.create({ name, email, age })
    if (!user) return res.status(400).json({ message: 'User not created successfully' })

    res.status(200).json({ message: 'User created successfully' })


  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error });
  }
};

export default createUser;
