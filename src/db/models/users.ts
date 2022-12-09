import mongoose, { Model } from 'mongoose'
import bcrypt from 'bcrypt'
import isEmail from 'validator/lib/isEmail'

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      validate: [isEmail, 'invalid email'],
    },
    name: { type: String, required: true },
    password: { type: String, required: true },
    otp: { type: String, required: false },
    otp_token: { type: String, required: false },
  },
  { timestamps: true },
)

export interface UserDocument extends mongoose.Document, UserI {}
export interface UserI {
  email: string
  name: string
  password: string
  otp?: string
  otp_token?: string
  createdAt: Date
  updatedAt: Date
}

export interface IUserMethods {
  matchPassword(password: string): Promise<Error | boolean>
}

export type UserModel = Model<UserI, Record<string, unknown>, IUserMethods>

UserSchema.pre('save', async function (next) {
  console.log('before saving into db')
  if (!this.isModified('password')) {
    next()
  }
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

//Schema method for match password
UserSchema.methods.matchPassword = async function (
  this: UserDocument,
  enteredPassword: string,
): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, this.password)
}

UserSchema.pre('save', function () {
  console.log('before saving into db')
})
UserSchema.post('save', function (doc) {
  console.log('after saving into db', doc)
})

const User = mongoose.model<UserI, UserModel>('User', UserSchema)

export default User
