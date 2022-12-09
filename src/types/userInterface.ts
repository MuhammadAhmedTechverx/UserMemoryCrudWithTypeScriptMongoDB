import { JwtPayload } from 'jsonwebtoken'
import { Model } from 'mongoose'

export interface IUser extends Document {
  email: string
}
export interface ErrorObject {
  message: string
  data?: [string]
}
export interface globalResponse {
  code?: number
  message?: string
  data?: string
}
export interface otpResponseObject {
  message: string
  otp_token: string
}

export interface loginInterface {
  email: string
  password: string
}
export interface userResultInterface {
  id: string
  email: string
  password: string
}
export interface forgotPasswordInterface {
  email: string
}
export interface resetPasswordInterface {
  otp: string
  otp_token: string
  confirmPassword: string
}
export interface otpVerifyInterface extends JwtPayload {
  email: string
  iat: number
  exp: number
  id: number
}
