import { Hasher } from '@/data/protocols/criptography/hasher'
import { LoadUserByEmailAndApplicationRepository } from '@/data/protocols/db/user/load-user-by-email-and-application-repository'
import { mockHasher } from '@/data/test/mock-criptography'
import { mockLoadUserByEmailAndApplicationRepository } from '@/data/test/mock-db-user'
import { mockUserModel, mockUserParams } from '@/domain/test/mock-user'
import { DbAddUser } from './db-add-user'

type SutTypes = {
  sut: DbAddUser
  hasherStub: Hasher
  loadUserByEmailAndApplicationRepositoryStub: LoadUserByEmailAndApplicationRepository
}

const mockSut = (): SutTypes => {
  const hasherStub = mockHasher()
  const loadUserByEmailAndApplicationRepositoryStub = mockLoadUserByEmailAndApplicationRepository()
  jest.spyOn(loadUserByEmailAndApplicationRepositoryStub, 'loadUserByEmailAndApplication').mockResolvedValue(null)
  return {
    sut: new DbAddUser(hasherStub, loadUserByEmailAndApplicationRepositoryStub),
    hasherStub,
    loadUserByEmailAndApplicationRepositoryStub
  }
}

describe('AddUser UseCase', () => {
  test('Should call Hasher with correct password', async () => {
    const { sut, hasherStub } = mockSut()

    const encryptSpy = jest.spyOn(hasherStub, 'hash')
    await sut.add(mockUserParams())
    expect(encryptSpy).toHaveBeenCalledWith(mockUserParams().password)
  })
  test('Should throw if Hasher throws', async () => {
    const { sut, hasherStub } = mockSut()

    jest.spyOn(hasherStub, 'hash').mockRejectedValueOnce(new Error())
    const promise = sut.add(mockUserParams())
    await expect(promise).rejects.toThrow()
  })
  test('Should call LoadUserByEmailAndApplicationRepository with correct values', async () => {
    const { sut, loadUserByEmailAndApplicationRepositoryStub } = mockSut()

    const loadSpy = jest.spyOn(loadUserByEmailAndApplicationRepositoryStub, 'loadUserByEmailAndApplication')
    await sut.add(mockUserParams())
    expect(loadSpy).toHaveBeenCalledWith(mockUserParams().email, mockUserParams().application)
  })
  test('Should return null if LoadAccountByEmailRepository returns an account', async () => {
    const { sut, loadUserByEmailAndApplicationRepositoryStub } = mockSut()
    jest.spyOn(loadUserByEmailAndApplicationRepositoryStub, 'loadUserByEmailAndApplication').mockResolvedValueOnce(mockUserModel())
    const user = await sut.add(mockUserParams())
    expect(user).toBe(null)
  })
  test('Should throw if loadUserByEmailAndApplicationRepositoryStub throws', async () => {
    const { sut, loadUserByEmailAndApplicationRepositoryStub } = mockSut()

    jest.spyOn(loadUserByEmailAndApplicationRepositoryStub, 'loadUserByEmailAndApplication').mockRejectedValueOnce(new Error())
    const promise = sut.add(mockUserParams())
    await expect(promise).rejects.toThrow()
  })
})
