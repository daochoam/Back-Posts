import bcrypt from 'bcrypt'

const handlerEncryptPassword = async (password: string): Promise<string> => {
  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    return hashedPassword

  } catch (error) {
    throw new Error('Error while encrypting password')
  }
}

export default handlerEncryptPassword