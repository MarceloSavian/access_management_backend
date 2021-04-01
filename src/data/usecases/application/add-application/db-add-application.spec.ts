import { AddApplicationRepository } from '@/data/protocols/db/application/add-application-repository'
import { ApplicationModel } from '@/domain/models/application'
import { AddApplicationParams } from '@/domain/usecases/application/add-application'
import { DbAddApplication } from './db-add-application'

type SutTypes = {
  sut: DbAddApplication
  addApplicationRepositoryStub: AddApplicationRepository
}

const mockApplicationModel = (): ApplicationModel => ({
  id: 'any_id',
  token: 'any_token',
  createdAt: new Date(),
  updatedAt: new Date(),
  ...mockApplicationParams()
})

const mockApplicationParams = (): AddApplicationParams => ({
  name: 'any_name'
})

const mockAddApplicationRepository = (): AddApplicationRepository => {
  class AddApplicationRepositoryStub implements AddApplicationRepository {
    async add (): Promise<ApplicationModel> {
      return await Promise.resolve(mockApplicationModel())
    }
  }
  return new AddApplicationRepositoryStub()
}

const mockSut = (): SutTypes => {
  const addApplicationRepositoryStub = mockAddApplicationRepository()
  return {
    sut: new DbAddApplication(addApplicationRepositoryStub),
    addApplicationRepositoryStub
  }
}

describe('AddApplication usecase', () => {
  test('Should call AddApllicationRepository with correct values', async () => {
    const { sut, addApplicationRepositoryStub } = mockSut()
    const addSpy = jest.spyOn(addApplicationRepositoryStub, 'add')
    await sut.add(mockApplicationParams())
    expect(addSpy).toHaveBeenCalledWith(mockApplicationParams())
  })
})
