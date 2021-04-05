import { mockUserParams } from '@/domain/test/mock-user'
import { postgresHelper } from '../helpers/postgres-helper'
import { UserRepository } from './user-postgres-repository'

type SutTypes = {
  sut: UserRepository
}

const mockSut = (): SutTypes => {
  return {
    sut: new UserRepository()
  }
}

describe('UserPostgresRepository', () => {
  beforeAll(async () => {
    await postgresHelper.connect(String(process.env.DATABASE_URL))
  })
  afterAll(async () => {
    await postgresHelper.disconnect()
  })
  describe('add', () => {
    test('Should return null on success', async () => {
      const { sut } = mockSut()
      const user = await sut.add(mockUserParams())
      expect(user).toBeFalsy()
    })
  })
})
