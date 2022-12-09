import mongoose from 'mongoose'
import User from './users'
import Memories from './memory'

const CommentSchema = new mongoose.Schema(
  {
    memoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Memories',
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    comment: {
      type: String,
    },
  },
  { timestamps: true },
)

export interface CommentDocument extends mongoose.Document {
  _id: string
  userId: string
  memoryId: string
  comment: string
}
const Comment = mongoose.model<CommentDocument>('Comment', CommentSchema)

export default Comment
