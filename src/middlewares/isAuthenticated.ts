import { NextFunction, Request, Response } from 'express'

export default function isAuthenticated() {
  return function (req: Request, res: Response, next: NextFunction) {
    if (!req.isAuthenticated()) {
      return res.redirect('/login')
    }
    next()
  }
}
