import { Hasher } from '@/data/protocols/criptography/hasher'
import { LoadUserByEmailAndApplicationRepository } from '@/data/protocols/db/user/load-user-by-email-and-application-repository'
import { UserModel } from '@/domain/models/user'
import { AddUser, AddUserParams } from '@/domain/usecases/user/add-user'

export class DbAddUser implements AddUser {
  constructor (
    private readonly hasher: Hasher,
    private readonly loadUserByEmailAndApplicationRepository: LoadUserByEmailAndApplicationRepository
  ) {}

  async add (user: AddUserParams): Promise<UserModel | null> {
    const searchUser = await this.loadUserByEmailAndApplicationRepository.loadUserByEmailAndApplication(user.email, user.application)
    if (searchUser) return null

    await this.hasher.hash(user.password)
    return {
      id: 1,
      name: 'string',
      email: 'string',
      password: 'string',
      application: 1,
      roles: [1]
    }
  }
}
