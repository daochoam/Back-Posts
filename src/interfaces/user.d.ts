import { Document, Schema } from 'mongoose';
export { };

declare global {

  interface IUser extends Document {
    fullName: string,
    age: number;
    email: string;
    password: string;
    posts?: Array<Schema.Types.ObjectId>;
    isActive: boolean;
  }
}