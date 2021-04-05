import { UserModel } from '@/domain/models/user'
import { mockUserModel } from '@/domain/test/mock-user'
import { LoadUserByEmailAndApplicationRepository } from '../protocols/db/user/load-user-by-email-and-application-repository'

export const mockLoadUserByEmailAndApplicationRepository = (): LoadUserByEmailAndApplicationRepository => {
  class LoadUserByEmailAndApplicationRepositoryStub implements LoadUserByEmailAndApplicationRepository {
    async loadUserByEmailAndApplication (): Promise<UserModel | null> {
      return mockUserModel()
    }
  }
  return new LoadUserByEmailAndApplicationRepositoryStub()
}
