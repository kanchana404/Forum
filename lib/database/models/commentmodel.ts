import { Schema, model, models, Document } from 'mongoose'

export interface IOrder extends Document {
  createdAt: Date
  stripeId: string
  totalAmount: string
  event: {
    _id: string
    title: string
  }
  buyer: {
    _id: string
    firstName: string
    lastName: string
  }
}

export type IOrderItem = {
  _id: string
  totalAmount: string
  createdAt: Date
  eventTitle: string
  eventId: string
  buyer: string
}

const CommentSchema = new Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },

  buyer: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
})

const Order = models.Order || model('Order', CommentSchema)

export default Order