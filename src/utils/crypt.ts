import bcrypt from 'bcrypt'

export const createHash = (val: string): string => {
  const salt = await bcrypt.genSalt(10)
  const password = await bcrypt.hash(input.password, salt)

  return a
}

// export const verifyHash = (password, hashPassword): string => {
//   return bcrypt.compareSync(password, hashPassword)
// }
