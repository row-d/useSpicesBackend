import { Application } from '../depts.ts'
import { ColorsController } from './controllers/colors.controller.ts'
import { ColorDAO } from './daos/color.dao.ts'

import { ColorsRouter } from './routers/colors.router.ts'
import { ColorsService } from './services/colors.service.ts'

const PORT = Number(Deno.env.get('PORT')) || 3000
const app = new Application()

// Necesidad de inyección de dependencias
// Necesidad de Decoradores
// 😔

const colorsRouter = new ColorsRouter(
  new ColorsController(new ColorsService(new ColorDAO()))
).router

app.use(colorsRouter.routes())
app.use(colorsRouter.allowedMethods())

await app.listen({ hostname: '127.0.0.1', port: PORT })
