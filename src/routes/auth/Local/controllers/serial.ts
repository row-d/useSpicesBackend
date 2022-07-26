import mongoose from 'mongoose'
import ContainerId from '../../../../Containers/types/ContainerId'

type AuthUser = {
  email: string
  password: string
  _id?: string
}

export const serialize:  = (
  user: AuthUser,
  done: (err: any, id?: unknown) => void
) =>{
  done(null, user._id)
}

export function deserialize(
  UserModel: mongoose.Model<AuthUser>,
  id: ContainerId,
  done: ([args:any]:any) => void
) {
  const user = UserModel.findById(id).lean()
  if (!user) {
    return done(null, false, { message: 'User not found' })
  }
  done(null, user)
}
