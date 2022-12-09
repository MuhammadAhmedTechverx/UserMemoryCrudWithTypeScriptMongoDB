import { JwtPayload, sign, verify } from 'jsonwebtoken'
import dotenv from 'dotenv'
import process from 'process'
import { otpVerifyInterface } from '../types/userInterface'

dotenv.config()

export const createAccessToken = (payload: object): string => {
  const signedToken = sign(payload, String(process.env.JWT_ACCESS_SECRET), {
    expiresIn: String(process.env.JWT_ACCESS_SECRET_EXPIRE),
  })
  return signedToken
}
export const verifyAccessToken = (token: string): string | object => {
  try {
    const decoded = verify(
      token,
      String(process.env.JWT_ACCESS_SECRET),
    ) as string
    return decoded
  } catch (error) {
    throw { message: 'Cannot verify refresh token.' }
  }
}
export const createOtpToken = (payload: object): string => {
  const signedToken = sign(payload, String(process.env.OTP_SECRET), {
    expiresIn: String(process.env.OTP_SECRET_EXPIRES),
  })
  return signedToken
}
export const verifyOtpToken = (token: string): otpVerifyInterface => {
  try {
    const decoded = <otpVerifyInterface>(
      verify(token, String(process.env.OTP_SECRET))
    )
    return decoded
  } catch (error) {
    throw { message: 'Cannot verify OTP token.' }
  }
}

// module.exports = { createAccessToken, verifyAccessToken }
