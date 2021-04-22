import { postgresHelper } from '../helpers/postgres-helper'
import { mockApplicationParams, mockUpdateApplicationParams } from '@/domain/test/mock-application'
import { ApplicationRepository } from './application-postgres-repository'
import MockDate from 'mockdate'
import { Application } from './application.entity'
const tableName = 'applications'

type SutTypes = {
  sut: ApplicationRepository
}

const mockSut = (): SutTypes => {
  return {
    sut: new ApplicationRepository()
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
  beforeEach(async () => {
    const appCollection = await postgresHelper.getQueryBuilder(Application, 'applications')
    await appCollection.softDelete()
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
  describe('update()', () => {
    test('Should return an application on success', async () => {
      const { sut } = mockSut()
      const id = await insertApplication()
      const application = await sut.update(id, mockUpdateApplicationParams())
      expect(application).toBeTruthy()
      expect(application.id).toBeTruthy()
      expect(application.name).toBe(mockUpdateApplicationParams().name)
      expect(application.token).toBe(mockUpdateApplicationParams().token)
      expect(application.updatedAt).toEqual(new Date())
      expect(application.createdAt).toEqual(new Date())
    })
  })
})
