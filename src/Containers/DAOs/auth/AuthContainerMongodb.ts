import { ContainerMongodb } from '../../ContainerMongodb'

type AuthUser = {
  email: string
  password: string
}

export default class AuthContainerMongodb extends ContainerMongodb<AuthUser> {
  constructor() {
    super('LocalSessions', process.env.MONGODB_URI as string, 'Session', {
      email: String,
      password: String,
    })
  }
}
