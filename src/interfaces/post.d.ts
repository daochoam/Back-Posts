import { Document, Schema } from "mongoose"
export { }

declare global {

  interface IPost extends Document {
    User_id: Schema.Types.ObjectId,
    title: string,
    content: string,
    likes: Array<Schema.Types.ObjectId>,
    deleteAt: Date,
    isActive: boolean,
  }
}
