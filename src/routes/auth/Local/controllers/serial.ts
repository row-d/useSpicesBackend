import mongoose from 'mongoose'

import ContainerId from '../../../../Containers/types/ContainerId'

type AnyObject = { [key: string]: any } // eslint-disable-line @typescript-eslint/no-explicit-any

type AuthUser = {
  email: string
  password: string
  _id?: string
}

export const serialize = (
  user: Express.User,
  done: (err: null, id?: unknown) => void
) => {
  done(null, user._id)
}

export const deserialize =
  (UserModel: mongoose.Model<AuthUser>) =>
  async (
    id: ContainerId,
    done: (err: null, user?: Express.User | boolean, info?: AnyObject) => void
  ) => {
    const user = await UserModel.findById(id).lean()
    if (!user) {
      return done(null, false, { message: 'User not found' })
    }
    done(null, user)
  }
