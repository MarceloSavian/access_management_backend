import { AddUserRepository } from '@/data/protocols/db/user/add-user-repository'
import { AddUserParams } from '@/domain/usecases/user/add-user'

export class UserRepository implements AddUserRepository {
  async add (user: Omit<AddUserParams, 'roles'>): Promise<null> {
    console.log(user)
    return null
  }
}
