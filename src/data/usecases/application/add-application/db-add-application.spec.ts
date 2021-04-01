import { AddApplicationRepository } from '@/data/protocols/db/application/add-application-repository'
import { mockAddApplicationRepository } from '@/data/test/mock-db-application'
import { mockApplicationParams } from '@/domain/test/mock-application'
import { DbAddApplication } from './db-add-application'

type SutTypes = {
  sut: DbAddApplication
  addApplicationRepositoryStub: AddApplicationRepository
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
  test('Should throw if AddApllicationRepository throws', async () => {
    const { sut, addApplicationRepositoryStub } = mockSut()
    jest.spyOn(addApplicationRepositoryStub, 'add').mockRejectedValueOnce(new Error())
    const promise = sut.add(mockApplicationParams())
    await expect(promise).rejects.toThrow()
  })
})
