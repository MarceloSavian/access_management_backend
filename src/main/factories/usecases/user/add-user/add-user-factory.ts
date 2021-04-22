import { DbAddUser } from '@/data/usecases/user/add-user/db-add-user'
import { AddUser } from '@/domain/usecases/user/add-user'
import { BcryptAdapter } from '@/infra/criptography/bcrypt-adapter'
import { UserRepository } from '@/infra/db/postgres/user/user-postgres-repository'

export const makeDbAddUser = (): AddUser => {
  const salt = 12
  const hasher = new BcryptAdapter(salt)
  const userRepository = new UserRepository()
  return new DbAddUser(hasher, userRepository, userRepository)
}
