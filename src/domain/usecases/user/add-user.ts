import { UserModel } from '@/domain/models/user'

export type AddUserParams = {
  name: string
  email: string
  password: string
  confirmedPassword: string
  application: number
  roles: number[]
}

export interface AddUser {
  add: (user: AddUserParams) => Promise<UserModel | null>
}
