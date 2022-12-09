import mongoose from 'mongoose'
import User from './users'

const MemorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
    },
    image: {
      type: Array,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    sharedFrom: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Memory',
      required: false,
    },
  },
  {
    strict: false,
  },
)

export interface MemoryDocument extends mongoose.Document {
  title: string
  description: string
  tags: [string]
  image: string
  userId: string
  sharedFrom?: string
}
const Memory = mongoose.model<MemoryDocument>('Memory', MemorySchema)

export default Memory
