import { Schema, model, models } from "mongoose";

const CommentSchema = new Schema({
  thread: { type: Schema.Types.ObjectId, ref: 'Thread', required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  comment: { type: String, required: true },
  postedAt: { type: Date, default: Date.now },
});

const Comment = models.Comment || model('Comment', CommentSchema);

export default Comment;
