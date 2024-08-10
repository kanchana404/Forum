// comment.model.ts
import mongoose, { Schema, model, models } from 'mongoose';

const CommentSchema = new Schema({
  thread: { type: Schema.Types.ObjectId, ref: 'Thread', required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Reference User model
  text: { type: String, required: true },
  postedAt: { type: Date, default: Date.now },
});

// Use mongoose.connection.model to avoid circular dependency issues
const Comment = models.Comment || mongoose.connection.model('Comment', CommentSchema);

export default Comment;
