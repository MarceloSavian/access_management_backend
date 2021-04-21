import { mockUserParams } from '@/domain/test/mock-user'
import { Application } from '../application/application.entity'
import { postgresHelper } from '../helpers/postgres-helper'
import { UserRepository } from './user-postgres-repository'
import { User } from './user.entity'
const tableName = 'applications'

type SutTypes = {
  sut: UserRepository
}

const mockSut = (): SutTypes => {
  return {
    sut: new UserRepository()
  }
}

export const insertApplication = async (): Promise<number> => {
  const query = await (await postgresHelper.getQueryBuilder(Application, tableName))
    .insert()
    .into(tableName)
    .values([
      {
        name: 'name',
        token: 'any_token',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
    .returning('id')
    .execute()
  return query.raw[0].id
}

describe('UserPostgresRepository', () => {
  beforeAll(async () => {
    await postgresHelper.connect(String(process.env.DATABASE_URL))
  })
  afterAll(async () => {
    await postgresHelper.disconnect()
  })
  afterEach(async () => {
    await (await postgresHelper.getQueryBuilder())
      .delete().from(User, 'users').execute()
  })
  describe('add', () => {
    test('Should insert an user on success', async () => {
      const { sut } = mockSut()
      const appId = await insertApplication()
      await sut.add({ ...mockUserParams(), application: appId })
      let user = await (await postgresHelper.getQueryBuilder())
        .select().from(User, 'users').execute()
      user = user[0]
      expect(user.id).toBeTruthy()
      expect(user.applicationId).toBeTruthy()
      expect(user.name).toBe(mockUserParams().name)
      expect(user.password).toBe(mockUserParams().password)
      expect(user.email).toBe(mockUserParams().email)
    })
  })
})
