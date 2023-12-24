import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { User } from '../../schemas';
import { handlerEncryptPassword } from '../../handlers';

const updateUserById = async (req: Request, res: Response) => {
  try {

    const { User_id } = res.locals;
    const { fullName, age, password, newPassword } = req.body;

    if (!fullName || !age || !password || !newPassword) return res.status(400).json({ message: '' })

    const user = await User.findById(User_id);
    if (!user) return res.status(403).json({ message: 'User not found' })

    fullName ? user.fullName = fullName : null
    age ? user.age = age : null

    if (newPassword && !password) return res.status(401).json({ message: 'Enter the old password' })
    if (newPassword && password) {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) return res.status(403).json({ message: 'Password is not valid' })
      user.password = await handlerEncryptPassword(newPassword)
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(403).json({ message: 'Password is not valid' })


  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}
export default updateUserById