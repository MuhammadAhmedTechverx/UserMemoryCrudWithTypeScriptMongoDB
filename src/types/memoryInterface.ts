import mongoose, { model, Schema, Model, Document } from 'mongoose'
import { CommentDocument } from '../db/models/comment'
import { LikeDocument } from '../db/models/like'
export interface ErrorObject {
  message: string
  data?: [string]
}
export interface globalResponse {
  code?: number
  message?: string
  data?: string
}

export interface getMemoryInterface {
  memoryId: string
}
export interface MemoryDocumentwithLikesComments extends mongoose.Document {
  title: string
  description: string
  tags: [string]
  image: string
  userId: string
  sharedFrom?: string
  likes?: LikeDocument[]
  comments?: CommentDocument[]
}
