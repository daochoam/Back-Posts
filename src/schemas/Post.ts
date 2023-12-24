import mongoose, { Schema } from "mongoose";

const postSchema = new Schema<IPost>({
  User_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: { type: String, required: true },
  content: { type: String, required: true },
  likes: [{ type: Schema.Types.ObjectId, ref: 'User_id' }],
  isActive: { type: Boolean, default: true },
  deleteAt: { type: Date, default: null }
}, {
  timestamps: true,
});

const Post = mongoose.model('Post', postSchema);
export default Post;