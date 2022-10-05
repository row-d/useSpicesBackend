import express, { Express, Request } from 'express'
import mongoose from 'mongoose'

import AuthDAOMongodb from '../../../../DAOs/Auth/AuthDAOMongodb'

// type AuthUser = {
//   email: string
//   password: string
//   _id?: string
// }

export const serialize = (
  user: Express.User,
  done: (err: null, id?: unknown) => void
) => {
  done(null, user.id)
}

// deserialize<TID, TR extends IncomingMessage = express.Request>(fn: (req: TR, id: TID, done: (err: any, user?: Express.User | false | null) => void) => void): void;

export function deserialize(DAO: AuthDAOMongodb) {
  return async (
    req: Request,
    id: mongoose.Types.ObjectId,
    done: (err: unknown, user?: Express.User | false | null) => void
  ) => {
    const user = (await DAO.Model.findById(id).lean()) as Express.User
    if (!user) {
      req.flash('error', 'User not found')
      return done(null, false)
    }
    done(null, user)
  }
}
