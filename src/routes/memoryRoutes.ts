import express from 'express'
import catchAsync from '../catchAsync'

import {
  commentMemory,
  createMemory,
  getMemory,
  likeMemory,
} from '../controllers/memory.controller'

import { getUserId } from '../middleware/bearer'

const router = express.Router()

router.post('/createMemory', getUserId, catchAsync(createMemory))
router.post('/likeMemory', getUserId, catchAsync(likeMemory))
router.post('/commentMemory', getUserId, catchAsync(commentMemory))
router.get('/getMemory', getUserId, catchAsync(getMemory))

export default router
