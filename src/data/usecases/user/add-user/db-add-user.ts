import { Hasher } from '@/data/protocols/criptography/hasher'
import { UserModel } from '@/domain/models/user'
import { AddUser, AddUserParams } from '@/domain/usecases/user/add-user'

export class DbAddUser implements AddUser {
  constructor (
    private readonly hasher: Hasher
  ) {}

  async add (user: AddUserParams): Promise<UserModel> {
    await this.hasher.hash(user.password)
    return {
      id: 1,
      name: 'string',
      email: 'string',
      password: 'string',
      confirmedPassword: 'string',
      application: 'string'
    }
  }
}
