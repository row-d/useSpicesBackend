import ContainerMongodb from '../../Containers/ContainerMongodb'
import AuthUserModel from '../../Models/AuthUserModel'
import { AuthUser } from '../../types/AuthUser'

export default class AuthDAOMongodb extends ContainerMongodb<AuthUser> {
  constructor() {
    super(
      'LocalSessions',
      process.env.MONGODB_URI as string,
      'Session',
      AuthUserModel
    )
  }
}
