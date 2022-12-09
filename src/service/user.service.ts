import { DocumentDefinition, FilterQuery } from 'mongoose'
import {
  ErrorObject,
  forgotPasswordInterface,
  globalResponse,
  IUser,
  loginInterface,
  otpResponseObject,
  otpVerifyInterface,
  resetPasswordInterface,
  userResultInterface,
} from '../types/userInterface'
import User, { UserDocument } from '../db/models/users'
import { sendMail } from '../utils/email'
import { createAccessToken, createOtpToken, verifyOtpToken } from '../utils/jwt'
import { generateOtp } from '../utils/other-utils'
import bcrypt from 'bcrypt'

export async function createUserService(
  input: DocumentDefinition<UserDocument>,
): Promise<UserDocument | ErrorObject> {
  try {
    const user: UserDocument | null = await User.findOne({ email: input.email })
    if (user === null) {
      // const salt = await bcrypt.genSalt(10)
      // const password = await bcrypt.hash(input.password, salt)
      // return await User.create(input)
      const user = new User({
        email: input.email,
        password: input.password,
        name: input.name,
      })
      const result = await user.save()
      return result
    }
    return {
      message: 'User Already Exists!',
    }
  } catch (error) {
    console.log(error)
    throw new Error('error')
  }
}

export async function findUser(
  query: FilterQuery<IUser>,
): Promise<IUser[] | ErrorObject> {
  try {
    const users: IUser[] = await User.find(query)
    if (users.length) {
      return users
    }
    return {
      message: 'no user found',
    }
  } catch (error) {
    throw new Error('error')
  }
}

export async function deleteUser(
  query: FilterQuery<IUser>,
): Promise<IUser | object> {
  try {
    const copy = { ...query }
    await User.deleteOne(copy)
    return {
      message: 'deleted user successfully',
    }
  } catch (error) {
    console.log(error)
    throw new Error('error')
  }
}

export async function userLogin(
  query: loginInterface,
): Promise<globalResponse | ErrorObject> {
  const { email, password } = query
  try {
    const user = await User.findOne({
      email: email,
    })
    if (user) {
      const validPassword = await user.matchPassword(password)
      // const validPassword = await bcrypt.compare(password, user.password)
      if (validPassword) {
        const access = createAccessToken({ email: user.email, id: user._id })
        return {
          code: 200,
          message: 'The user is successfully logged in',
          data: access,
        }
      } else {
        return {
          message: ' Credential is not valid',
        }
      }
    } else {
      return {
        message: 'User does not exist',
      }
    }
  } catch (err) {
    throw err
  }
}

export async function userForgot(
  query: forgotPasswordInterface,
): Promise<globalResponse | ErrorObject> {
  const { email } = query
  try {
    const user = await User.findOne({ email: email })
    if (user) {
      const otp = `${generateOtp(6)}`
      const optToken = createOtpToken({ email: user.email })

      const mailSent = await sendMail(
        user.email,
        'Forgot Password',
        `<b>welcome${otp}</b>`, // HTML body content,
      )
      if (mailSent) {
        await User.updateOne(
          {
            email: user.email,
          },
          {
            $set: {
              otp: otp,
              otp_token: optToken,
            },
          },
        )
        return {
          code: 200,
          message: 'Check your email to reset your password.',
          data: optToken,
        }
      } else {
        return {
          message: 'mail not sent to user',
        }
      }
    } else {
      return {
        message: 'User does not exist',
      }
    }
  } catch (err) {
    throw err
  }
}

export async function checkOtpAndResetpassword(
  query: resetPasswordInterface,
): Promise<otpResponseObject | ErrorObject> {
  try {
    const { otp, otp_token, confirmPassword } = query
    const checkOtpToken: otpVerifyInterface = verifyOtpToken(otp_token)
    if (checkOtpToken.id) {
      const user = await User.findOne({ email: checkOtpToken.email })
      if (user?.otp === otp) {
        await User.updateOne(
          {
            email: user.email,
          },
          {
            $set: {
              password: confirmPassword,
            },
          },
        )
        return {
          message: 'user password updated',
        }
      } else {
        return {
          message: 'otp is not matched',
        }
      }
    } else {
      return {
        message: 'otp_token is not correct',
      }
    }
  } catch (err) {
    throw err
  }
}
