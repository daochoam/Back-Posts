import jwt from 'jsonwebtoken';
import { config } from '../config';

const handlerTokenIdSession = (sessionID: string) => {
  try {
    const tokenID = jwt.sign({ sessionID }, config.JWT_ID_SESSION);
    return tokenID
  }
  catch (error) {
    throw new Error('Could not create the token')
  }
}

export default handlerTokenIdSession;