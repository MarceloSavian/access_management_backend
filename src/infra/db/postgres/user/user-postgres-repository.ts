import { AddUserRepository } from '@/data/protocols/db/user/add-user-repository'
import { LoadUserByEmailAndApplicationRepository } from '@/data/protocols/db/user/load-user-by-email-and-application-repository'
import { UserModel } from '@/domain/models/user'
import { AddUserParams } from '@/domain/usecases/user/add-user'
import { postgresHelper } from '../helpers/postgres-helper'
import { User } from './user.entity'

export class UserRepository implements AddUserRepository, LoadUserByEmailAndApplicationRepository {
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

  async loadUserByEmailAndApplication (email: string, application: number): Promise<UserModel | null> {
    const user = await (await postgresHelper.getQueryBuilder(User, 'users'))
      .select()
      .where('users.email = :email', { email })
      .andWhere('users.applicationId = :application', { application })
      .getOne()

    return { ...user, applicationId: application }
  }
}
