import { AddUserRepository } from '@/data/protocols/db/user/add-user-repository'
import { AddUserParams } from '@/domain/usecases/user/add-user'
import { postgresHelper } from '../helpers/postgres-helper'
import { User } from './user.entity'

export class UserRepository implements AddUserRepository {
  async add (user: Omit<AddUserParams, 'roles'>): Promise<null> {
    await (await postgresHelper.getQueryBuilder(User, 'users'))
      .insert()
      .into(User)
      .values([
        {
          name: user.name,
          password: user.password,
          application: () => user.application.toString(),
          email: user.email
        }
      ])
      .execute()

    return null
  }
}
