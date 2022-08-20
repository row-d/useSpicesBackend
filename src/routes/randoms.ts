import { Router } from 'express'

import randoms from '../functions/randoms'

const randomsRoute = Router()
randomsRoute.get('/', (req, res) => {
  const { cant } = req.query
  cant ? res.send(randoms(Number(cant))) : res.send(randoms(1e8))
})

export default randomsRoute
