import mongoose, { Schema } from "mongoose";

const commentSchema = new Schema<IComment>({
  Post_id: {
    type: Schema.Types.ObjectId,
    ref: 'Post',
    required: true
  },
  User_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  Comment_id: {
    type: Schema.Types.ObjectId,
    ref: 'Comment',
    required: false
  },
  comment: { type: String },
  likes: {
    type: [{
      type: Schema.Types.ObjectId,
      ref: 'User_id'
    }]
  },
  deleteAt: { type: String, default: null },
  isActive: { type: Boolean, default: true }
}, {
  timestamps: true,
});

const Comment = mongoose.model('Comment', commentSchema);
export default Comment;