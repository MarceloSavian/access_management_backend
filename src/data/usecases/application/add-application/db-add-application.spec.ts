import { Hasher } from '@/data/protocols/criptography/hasher'
import { AddApplicationRepository } from '@/data/protocols/db/application/add-application-repository'
import { mockHasher } from '@/data/test/mock-criptography'
import { mockAddApplicationRepository } from '@/data/test/mock-db-application'
import { mockApplicationModel, mockApplicationParams } from '@/domain/test/mock-application'
import { DbAddApplication } from './db-add-application'

type SutTypes = {
  sut: DbAddApplication
  addApplicationRepositoryStub: AddApplicationRepository
  hasherStub: Hasher
}

const mockSut = (): SutTypes => {
  const hasherStub = mockHasher()
  const addApplicationRepositoryStub = mockAddApplicationRepository()
  return {
    sut: new DbAddApplication(addApplicationRepositoryStub, hasherStub),
    addApplicationRepositoryStub,
    hasherStub
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
  test('Should call Hasher with correct value', async () => {
    const { sut, hasherStub } = mockSut()
    const encryptSpy = jest.spyOn(hasherStub, 'hash')
    await sut.add(mockApplicationParams())
    expect(encryptSpy).toHaveBeenCalledWith({ application: mockApplicationModel().id })
  })
  test('Should throw if Hasher throws', async () => {
    const { sut, hasherStub } = mockSut()
    jest.spyOn(hasherStub, 'hash').mockRejectedValueOnce(new Error())
    const promise = sut.add(mockApplicationParams())
    await expect(promise).rejects.toThrow()
  })
})
