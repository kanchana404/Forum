// thread.model.ts
import { Schema, model, models } from 'mongoose';
import User from './user.model';  // Import User model first
import Comment from './comment.model';  // Import Comment model next

const ThreadSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  postedAt: { type: Date, default: Date.now },
  upvotes: { type: Number, default: 0 },
  downvotes: { type: Number, default: 0 },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
});

const Thread = models.Thread || model('Thread', ThreadSchema);

export default Thread;
