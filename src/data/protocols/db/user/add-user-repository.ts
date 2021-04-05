import { AddUserParams } from '@/domain/usecases/user/add-user'

export interface AddUserRepository {
  add: (user: Omit<AddUserParams, 'roles'>) => Promise<null>
}
