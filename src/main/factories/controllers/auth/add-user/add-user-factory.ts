import { AddUserController } from '@/presentation/controllers/auth/add-user/add-user-controller'
import { Controller } from '@/presentation/protocols/controller'
import { makeAddUserValidation } from './add-user-validation'

export const makeAddUserController = (): Controller => {
  return new AddUserController(makeAddUserValidation(), makeDbAddAddUser())
}
