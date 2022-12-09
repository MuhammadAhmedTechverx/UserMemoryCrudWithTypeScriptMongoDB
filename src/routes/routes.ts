import express from 'express'
import catchAsync from '../catchAsync'
import {
  deleteUsers,
  getUsers,
  postUsers,
  login,
  forgotPassword,
  resetPassword,
  readfile,
} from '../controllers/user.controller'
import { findUser } from '../service/user.service'

const router = express.Router()

router.get('/getUser', catchAsync(getUsers))
router.get('/deleteUser', catchAsync(deleteUsers))
router.post('/register', catchAsync(postUsers))
router.post('/login', catchAsync(login))
router.post('/forgotPassword', catchAsync(forgotPassword))
router.post('/resetPassword', catchAsync(resetPassword))
router.get('/read', readfile)

export default router
