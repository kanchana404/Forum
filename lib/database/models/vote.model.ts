import { Schema, model, models } from 'mongoose';

const VoteSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  threadId: { type: Schema.Types.ObjectId, ref: 'Thread', required: true },
  type: { type: String, enum: ['upvote', 'downvote'], required: true },
  createdAt: { type: Date, default: Date.now },
});

const Vote = models.Vote || model('Vote', VoteSchema);

export default Vote;
