import { faker } from '@faker-js/faker'
import Usuario from '../Usuario'

export const randomUser = () =>
  new Usuario(faker.name.firstName(), faker.name.lastName())
