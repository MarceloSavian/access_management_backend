import { postgresHelper } from '../helpers/postgres-helper'
import { mockApplicationParams } from '@/domain/test/mock-application'
import { ApplicationRepository } from './application-postgres-repository'
import MockDate from 'mockdate'

type SutTypes = {
  sut: ApplicationRepository
}

const mockSut = (): SutTypes => {
  return {
    sut: new ApplicationRepository()
  }
}

describe('ApplicationRepository', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })
  afterAll(() => {
    MockDate.reset()
  })
  beforeAll(async () => {
    await postgresHelper.connect(String(process.env.DATABASE_URL))
  })
  afterAll(async () => {
    await postgresHelper.disconnect()
  })
  describe('Add()', () => {
    test('Should return an application on success', async () => {
      const { sut } = mockSut()
      const application = await sut.add(mockApplicationParams())
      expect(application).toBeTruthy()
      expect(application.id).toBeTruthy()
      expect(application.name).toBe(mockApplicationParams().name)
      expect(application.token).toBe('')
      expect(application.updatedAt).toEqual(new Date())
      expect(application.createdAt).toEqual(new Date())
    })
  })
})
