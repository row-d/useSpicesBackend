import { NextFunction, Request, Response } from 'express'

import logger from '../logger'

export function log() {
  return function (req: Request, res: Response, next: NextFunction) {
    logger.info(`${req.method} ${req.url}`)
    next()
  }
}

export function errorLog() {
  return function (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    logger.error(err.stack)
    next(err)
  }
}
