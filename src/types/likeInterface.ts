import mongoose from 'mongoose'
export interface LikeInputDocument extends mongoose.Document {
  memoryId: string
  flag: boolean
}
