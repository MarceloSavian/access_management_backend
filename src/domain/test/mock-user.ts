import { AddUserParams } from '../usecases/user/add-user'

export const mockUserParams = (): AddUserParams => ({
  name: 'any_name',
  email: 'any_email@email.com',
  password: 'any_password',
  confirmedPassword: 'any_password',
  application: 1,
  roles: [1]
})
