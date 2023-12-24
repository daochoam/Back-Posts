import { Schema } from "mongoose";
import mongoose from 'mongoose';

const userSchema = new Schema<IUser>({
  fullName: { type: String, required: true },
  age: { type: Number, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
  isActive: { type: Boolean, default: true, required: true },
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);
export default User;