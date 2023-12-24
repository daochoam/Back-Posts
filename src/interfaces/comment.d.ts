import { Document, Schema, Types } from "mongoose"
export { }

declare global {

  interface IComment extends Document {
    Post_id: Schema.Types.ObjectId,
    User_id: Schema.Types.ObjectId,
    Comment_id: Schema.Types.ObjectId,
    comment: string
    likes: Array<Schema.Types.ObjectId>,
    deleteAt: string,
    isActive: boolean
  }
}