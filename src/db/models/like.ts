import mongoose from 'mongoose'
import User from './users'
import Memories from './memory'

const LikeSchema = new mongoose.Schema(
  {
    memoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Memories,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
      required: true,
    },
    flag: {
      type: Boolean,
      required: true,
    },
  },
  {
    strict: false,
  },
)

export interface LikeDocument extends mongoose.Document {
  _id: string
  memoryId: string
  userId: string
  flag: boolean
}

const Like = mongoose.model<LikeDocument>('Like', LikeSchema)

export default Like
