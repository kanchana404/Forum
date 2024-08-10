import { Document, Schema, model, models } from "mongoose";

export interface IEvent extends Document {
  _id: string;
  title: string;
  description?: string;
  organizer: { _id: string, firstName: string, lastName: string }
}

const EventSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  organizer: { type: Schema.Types.ObjectId, ref: 'User' },
})

const Event = models.Event || model('Event', EventSchema);

export default Event;