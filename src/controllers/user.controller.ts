import { Request, Response } from 'express'
import { FilterQuery } from 'mongoose'
import path from 'path'
import { UserDocument } from '../db/models/users'
import {
  forgotPasswordInterface,
  IUser,
  loginInterface,
  resetPasswordInterface,
} from '../types/userInterface'
import {
  checkOtpAndResetpassword,
  createUserService,
  deleteUser,
  findUser,
  userForgot,
  userLogin,
} from '../service/user.service'

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  const value = { ...req.body } as FilterQuery<IUser>
  try {
    const user = await findUser(value)
    if (user) {
      res.status(200).json({
        result: user,
      })
    }
  } catch (error) {
    res.status(200).json({
      messsage: error,
    })
  }
}

export const postUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const value = req.body as UserDocument
    const user = await createUserService(value)
    if (user) {
      res.status(200).json({
        result: user,
      })
    }
  } catch (error) {
    res.status(200).json({
      messsage: error,
    })
  }
}

export const deleteUsers = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const value = { ...req.body } as FilterQuery<IUser>
    const user = await deleteUser(value)
    if (user) {
      res.status(200).json({
        messsage: 'user deleted',
        result: user,
      })
    } else {
      res.status(200).json({
        messsage: 'no user found',
      })
    }
  } catch (error) {
    res.status(200).json({
      messsage: error,
    })
  }
  // return {}
}

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const value = req.body as loginInterface
    const user = await userLogin(value)
    console.log('hello', user)
    if (user) {
      res.status(200).json({
        result: user,
      })
    }
  } catch (error) {
    res.status(200).json({
      messsage: error,
    })
  }
}

export const forgotPassword = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const value = req.body as forgotPasswordInterface
    const user = await userForgot(value)
    if (user) {
      res.status(200).json({
        messsage: user,
      })
    }
  } catch (error) {
    res.status(200).json({
      messsage: error,
    })
  }
}

export const resetPassword = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const value = req.body as resetPasswordInterface
    const user = await checkOtpAndResetpassword(value)
    if (user) {
      res.status(200).json({
        result: user,
      })
    }
  } catch (error) {
    res.status(200).json({
      messsage: error,
    })
  }
}

export const readfile = (req: Request, res: Response): void => {
  try {
    const filePath = path.join(__dirname, '../', 'hello.txt')

    // fs.readFile(filePath, { encoding: 'utf-8' }, function (err, data) {
    //   if (!err) {
    //     console.log('received data: ' + data)
    //     const writeStream = fs.createWriteStream('JournalDEV.txt')
    //     writeStream.write(data)
    //     writeStream.end()
    //     res.sendFile(filePath, function (err) {
    //       if (err) {
    //         next(err)
    //       } else {
    //         console.log('Sent:', filePath)
    //       }
    //     })
    //     // res.status(200).json({
    //     //   messsage: 'completed',
    //     // })
    //   } else {
    //     console.log(err)
    //   }
    // })

    // console.log(path.join(__dirname, '../'))

    // const options = {
    //   root: path.join(__dirname),
    // }
    // const fileName = 'Hello.txt'
    // res.sendFile(fileName, options, function (err) {
    //   if (err) {
    //     next(err)
    //   } else {
    //     console.log('Sent:', fileName)
    //   }
    // })
    res.download(filePath)
  } catch (error) {
    res.status(200).json({
      messsage: error,
    })
  }
}
