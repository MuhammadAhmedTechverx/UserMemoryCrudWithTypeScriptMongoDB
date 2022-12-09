import { Request, RequestHandler } from 'express'
import { verifyAccessToken } from '../utils/jwt'

export const getUserId: RequestHandler = (req: Request, res, next) => {
  try {
    let bearer = req.headers.authorization
    if (bearer) {
      bearer = bearer.replace('Bearer ', '')
      const userTokenPayload: object | string = verifyAccessToken(bearer)
      if (typeof userTokenPayload === 'object') {
        res.locals = userTokenPayload

        next()
      }
    }
  } catch (error) {
    if (typeof error === 'object') {
      Object.keys(error as object).includes('message')
        ? res.status(402).json(error)
        : res.status(500).json(error)
    }
  }
}
