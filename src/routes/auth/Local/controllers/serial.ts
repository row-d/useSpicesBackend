import { Express, Request } from 'express'
import mongoose from 'mongoose'

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
    req: Request,
    id: string,
    done: (err: unknown, user?: Express.User | false | null) => void
  ) => {
    const user = await UserModel.findById(id).exec()
    if (!user) {
      req.flash('error', 'User not found')
      return done(null, false)
    }
    done(null, user)
  }
