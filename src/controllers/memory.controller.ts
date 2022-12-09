import { Request, Response } from 'express'
import { CommentDocument } from '../db/models/comment'
import { CommentInputDocument } from '../types/commentInterface'
import { LikeDocument } from '../db/models/like'
import { LikeInputDocument } from '../types/likeInterface'
import { MemoryDocument } from '../db/models/memory'
import {
  commentMemoryService,
  createMemoryService,
  getMemoryService,
  likeMemoryService,
} from '../service/memory.service'
import { PayloadInterface } from '../types/middlwareInterface'
import { ErrorObject } from '../types/userInterface'
import { getMemoryInterface } from '../types/memoryInterface'

// You can write services in a separate folder
export const createMemory = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const value = req.body as MemoryDocument
    const memory = await createMemoryService(
      value,
      res.locals as PayloadInterface,
    )
    if (memory) {
      res.status(200).json({
        result: memory,
      })
    }
  } catch (error) {
    res.status(200).json({
      messsage: error,
    })
  }
}
export const likeMemory = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const value = req.body as LikeInputDocument
    const likeMemory: LikeDocument | ErrorObject = await likeMemoryService(
      value,
      res.locals as PayloadInterface,
    )
    if (likeMemory) {
      res.status(200).json({
        result: likeMemory,
      })
    }
  } catch (error) {
    res.status(200).json({
      messsage: error,
    })
  }
}
export const commentMemory = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const value = req.body as CommentInputDocument
    const commentMemory:
      | CommentDocument
      | ErrorObject = await commentMemoryService(
      value,
      res.locals as PayloadInterface,
    )
    if (commentMemory) {
      res.status(200).json({
        result: commentMemory,
      })
    }
  } catch (error) {
    res.status(200).json({
      messsage: error,
    })
  }
}
export const getMemory = async (req: Request, res: Response): Promise<void> => {
  try {
    const value = req.body as getMemoryInterface
    const getMemory = await getMemoryService(value)
    if (getMemory) {
      res.status(200).json({
        result: getMemory,
      })
    }
  } catch (error) {
    res.status(200).json({
      messsage: error,
    })
  }
}
