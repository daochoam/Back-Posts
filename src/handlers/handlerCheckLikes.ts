import { Schema } from "mongoose";

const handlerCheckLikes = (data: Array<Schema.Types.ObjectId>, info: Schema.Types.ObjectId) => {
  const likesValue = data.some((like) => like.toString() === info.toString());
  if (likesValue) {
    data = data.filter((like) => like.toString() !== info.toString());
  } else {
    data.push(info);
  }
};

export default handlerCheckLikes;
