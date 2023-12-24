import { Request, Response } from 'express'
import { User } from '../../schemas'
import { handlerEncryptPassword } from '../../handlers';

const signUp = async (req: Request, res: Response) => {
  try {
    const {
      fullName,
      age,
      email,
      password
    } = req.body as IUser;

    if (!fullName || !age || !email || !password) return res.status(400).json({ message: "All fields are required" });

    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "The user has previously registered" })

    const hashedPassword = await handlerEncryptPassword(password as string)
    const userCreate = new User({
      fullName,
      age,
      email,
      password: hashedPassword,
    });

    user = await userCreate.save()

    if (user) return res.status(200).json({ message: "The user has been successfully registered", user });
    else return res.status(200).json({ message: "An error occurred during user registration." });

  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error });
  }
}
export default signUp