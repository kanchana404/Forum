import { Schema, model, models } from "mongoose";

const ThreadSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  user: { type: String, required: true },  // Store Clerk User ID as string
  postedAt: { type: Date, default: Date.now },
  upvotes: { type: Number, default: 0 },
  downvotes: { type: Number, default: 0 },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
});

const Thread = models.Thread || model('Thread', ThreadSchema);

export default Thread;
