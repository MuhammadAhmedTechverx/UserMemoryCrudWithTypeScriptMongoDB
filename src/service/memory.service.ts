import mongoose, { DocumentDefinition, FilterQuery } from 'mongoose'
import Comment, { CommentDocument } from '../db/models/comment'
import { CommentInputDocument } from '../types/commentInterface'
import Like, { LikeDocument } from '../db/models/like'
import { LikeInputDocument } from '../types/likeInterface'
import Memory, { MemoryDocument } from '../db/models/memory'
import {
  ErrorObject,
  getMemoryInterface,
  MemoryDocumentwithLikesComments,
} from '../types/memoryInterface'
import { PayloadInterface } from '../types/middlwareInterface'

export async function createMemoryService(
  input: DocumentDefinition<MemoryDocument>,
  userId: PayloadInterface,
): Promise<MemoryDocument | ErrorObject> {
  try {
    const memory = new Memory({
      title: input.title,
      description: input.description,
      tags: input.tags,
      image: input.image,
      userId: userId.id,
    })
    const result: MemoryDocument = await memory.save()
    return result
  } catch (error) {
    console.log(error)
    throw new Error('error')
  }
}

export async function likeMemoryService(
  input: DocumentDefinition<LikeInputDocument>,
  userId: PayloadInterface,
): Promise<LikeDocument | ErrorObject> {
  try {
    const memory = await Memory.findById(input.memoryId)
    const memoryBeforeLiked: LikeDocument | null = await Like.findOne({
      memoryId: input.memoryId,
      userId: userId.id,
    })
    if (memoryBeforeLiked) {
      await Like.deleteOne({
        _id: memoryBeforeLiked._id,
      })
      return {
        message: 'UnLiked Successfully',
      }
    } else {
      if (memory) {
        const likeMemory = new Like({
          memoryId: input.memoryId,
          flag: input.flag,
          userId: userId.id,
        })
        const result: LikeDocument = await likeMemory.save()
        return result
      } else {
        return {
          message: 'there is no memory against this id',
        }
      }
    }
  } catch (error) {
    console.log(error)
    throw new Error('error')
  }
}

export async function commentMemoryService(
  input: DocumentDefinition<CommentInputDocument>,
  userId: PayloadInterface,
): Promise<CommentDocument | ErrorObject> {
  try {
    const memory = await Memory.findById(input.memoryId)
    if (memory) {
      const commentMemory = new Comment({
        memoryId: input.memoryId,
        userId: userId.id,
        comment: input.comment,
      })
      const result: CommentDocument = await commentMemory.save()
      return result
    } else {
      return {
        message: 'there is not Memory against this id',
      }
    }
  } catch (error) {
    console.log(error)
    throw new Error('error')
  }
}

export async function getMemoryService(
  input: getMemoryInterface,
): Promise<MemoryDocumentwithLikesComments[] | ErrorObject> {
  try {
    const memory = await Memory.findById(input.memoryId)
    if (memory) {
      const val = input.memoryId
      const searchObject = { _id: new mongoose.Types.ObjectId(val) }
      const filterResult = [
        {
          $match: {
            _id: searchObject._id,
          },
        },
        {
          $lookup: {
            from: 'comments',
            localField: '_id',
            foreignField: 'memoryId',
            as: 'comments',
          },
        },
        {
          $lookup: {
            from: 'likes',
            localField: '_id',
            foreignField: 'memoryId',
            as: 'likes',
          },
        },
      ]
      const result: MemoryDocumentwithLikesComments[] = await Memory.aggregate(
        filterResult,
      )
      return result
    } else {
      return {
        message: 'there is no memory against this id',
      }
    }
  } catch (error) {
    console.log(error)
    throw new Error('error')
  }
}
