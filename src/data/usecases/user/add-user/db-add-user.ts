import { Hasher } from '@/data/protocols/criptography/hasher'
import { AddUserRepository } from '@/data/protocols/db/user/add-user-repository'
import { LoadUserByEmailAndApplicationRepository } from '@/data/protocols/db/user/load-user-by-email-and-application-repository'
import { UserModel } from '@/domain/models/user'
import { AddUser, AddUserParams } from '@/domain/usecases/user/add-user'

export class DbAddUser implements AddUser {
  constructor (
    private readonly hasher: Hasher,
    private readonly loadUserByEmailAndApplicationRepository: LoadUserByEmailAndApplicationRepository,
    private readonly addUserRepository: AddUserRepository
  ) {}

  async add (user: AddUserParams): Promise<UserModel | null> {
    const searchUser = await this.loadUserByEmailAndApplicationRepository.loadUserByEmailAndApplication(user.email, user.application)
    console.log(searchUser)
    if (searchUser) return null

    const hashedPassword = await this.hasher.hash(user.password)

    await this.addUserRepository.add({
      name: user.name,
      email: user.email,
      application: user.application,
      password: hashedPassword
    })

    return await this.loadUserByEmailAndApplicationRepository.loadUserByEmailAndApplication(user.email, user.application)
  }
}
