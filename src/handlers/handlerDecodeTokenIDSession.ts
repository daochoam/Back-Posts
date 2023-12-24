import jwt, { JwtPayload } from 'jsonwebtoken';
import { config } from '../config';

const handlerDecodeTokenIDSession = (tokenSessionID: any): string => {
  try {
    const tokenID: JwtPayload | string = jwt.verify(tokenSessionID, config.JWT_ID_SESSION);
    const { sessionID } = tokenID as JwtPayload;
    return sessionID.toString()
  }
  catch (error) {
    throw new Error('Could not decode the token')
  }
}

export default handlerDecodeTokenIDSession