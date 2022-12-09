import { Request, Response, NextFunction } from 'express'

type fn = (req: Request, res: Response, next?: NextFunction) => Promise<any>

const catchAsync = (fn: fn) => (
  req: Request,
  res: Response,
  next?: NextFunction,
): any => {
  Promise.resolve(fn(req, res, next)).catch((err) => {
    console.log(err)
    if (next) {
      next(err)
    }
  })
}

export default catchAsync
