import { UserModel } from '@/domain/models/user'
import { mockUserModel } from '@/domain/test/mock-user'
import { AddUser } from '@/domain/usecases/user/add-user'

export const mockAddUser = (): AddUser => {
  class AddUserStub implements AddUser {
    async add (): Promise<UserModel> {
      return mockUserModel()
    }
  }
  return new AddUserStub()
}
