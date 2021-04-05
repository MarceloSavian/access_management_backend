import { UserModel } from '@/domain/models/user'
import { mockUserModel } from '@/domain/test/mock-user'
import { AddUserRepository } from '../protocols/db/user/add-user-repository'
import { LoadUserByEmailAndApplicationRepository } from '../protocols/db/user/load-user-by-email-and-application-repository'

export const mockLoadUserByEmailAndApplicationRepository = (): LoadUserByEmailAndApplicationRepository => {
  class LoadUserByEmailAndApplicationRepositoryStub implements LoadUserByEmailAndApplicationRepository {
    async loadUserByEmailAndApplication (): Promise<UserModel | null> {
      return mockUserModel()
    }
  }
  return new LoadUserByEmailAndApplicationRepositoryStub()
}

export const mockAddUserRepository = (): AddUserRepository => {
  class AddUserStub implements AddUserRepository {
    async add (): Promise<null> {
      return null
    }
  }
  return new AddUserStub()
}
