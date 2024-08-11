import { Schema, model, models } from 'mongoose';

const ThreadSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  userFirstName: { type: String, required: true },
  userProfilePic: { type: String, required: true },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  upvotes: { type: Number, default: 0 },
  downvotes: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

const Thread = models.Thread || model('Thread', ThreadSchema);

export default Thread;
