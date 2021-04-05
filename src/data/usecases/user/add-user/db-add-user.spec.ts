import { Hasher } from '@/data/protocols/criptography/hasher'
import { AddUserRepository } from '@/data/protocols/db/user/add-user-repository'
import { LoadUserByEmailAndApplicationRepository } from '@/data/protocols/db/user/load-user-by-email-and-application-repository'
import { mockHasher } from '@/data/test/mock-criptography'
import { mockAddUserRepository, mockLoadUserByEmailAndApplicationRepository } from '@/data/test/mock-db-user'
import { mockUserParams } from '@/domain/test/mock-user'
import { DbAddUser } from './db-add-user'

type SutTypes = {
  sut: DbAddUser
  hasherStub: Hasher
  loadUserByEmailAndApplicationRepositoryStub: LoadUserByEmailAndApplicationRepository
  addUserRepositoryStub: AddUserRepository
}

const mockSut = (): SutTypes => {
  const hasherStub = mockHasher()
  const addUserRepositoryStub = mockAddUserRepository()
  const loadUserByEmailAndApplicationRepositoryStub = mockLoadUserByEmailAndApplicationRepository()

  return {
    sut: new DbAddUser(hasherStub, loadUserByEmailAndApplicationRepositoryStub, addUserRepositoryStub),
    hasherStub,
    loadUserByEmailAndApplicationRepositoryStub,
    addUserRepositoryStub
  }
}

describe('AddUser UseCase', () => {
  test('Should call Hasher with correct password', async () => {
    const { sut, hasherStub, loadUserByEmailAndApplicationRepositoryStub } = mockSut()
    jest.spyOn(loadUserByEmailAndApplicationRepositoryStub, 'loadUserByEmailAndApplication').mockResolvedValueOnce(null)
    const encryptSpy = jest.spyOn(hasherStub, 'hash')
    await sut.add(mockUserParams())
    expect(encryptSpy).toHaveBeenCalledWith(mockUserParams().password)
  })
  test('Should throw if Hasher throws', async () => {
    const { sut, hasherStub, loadUserByEmailAndApplicationRepositoryStub } = mockSut()
    jest.spyOn(loadUserByEmailAndApplicationRepositoryStub, 'loadUserByEmailAndApplication').mockResolvedValueOnce(null)
    jest.spyOn(hasherStub, 'hash').mockRejectedValueOnce(new Error())
    const promise = sut.add(mockUserParams())
    await expect(promise).rejects.toThrow()
  })
  test('Should call LoadUserByEmailAndApplicationRepository with correct values', async () => {
    const { sut, loadUserByEmailAndApplicationRepositoryStub } = mockSut()
    jest.spyOn(loadUserByEmailAndApplicationRepositoryStub, 'loadUserByEmailAndApplication').mockResolvedValueOnce(null)
    const loadSpy = jest.spyOn(loadUserByEmailAndApplicationRepositoryStub, 'loadUserByEmailAndApplication')
    await sut.add(mockUserParams())
    expect(loadSpy).toHaveBeenCalledWith(mockUserParams().email, mockUserParams().application)
  })
  test('Should return null if LoadAccountByEmailRepository returns an account', async () => {
    const { sut } = mockSut()

    const user = await sut.add(mockUserParams())
    expect(user).toBe(null)
  })
  test('Should throw if loadUserByEmailAndApplicationRepositoryStub throws', async () => {
    const { sut, loadUserByEmailAndApplicationRepositoryStub } = mockSut()

    jest.spyOn(loadUserByEmailAndApplicationRepositoryStub, 'loadUserByEmailAndApplication').mockRejectedValueOnce(new Error())
    const promise = sut.add(mockUserParams())
    await expect(promise).rejects.toThrow()
  })
  test('Should call AddUserRepository with correct values', async () => {
    const { sut, addUserRepositoryStub, loadUserByEmailAndApplicationRepositoryStub } = mockSut()
    jest.spyOn(loadUserByEmailAndApplicationRepositoryStub, 'loadUserByEmailAndApplication').mockResolvedValueOnce(null)
    const loadSpy = jest.spyOn(addUserRepositoryStub, 'add')
    await sut.add(mockUserParams())
    expect(loadSpy).toHaveBeenCalledWith({
      name: mockUserParams().name,
      email: mockUserParams().email,
      application: mockUserParams().application,
      password: 'hashed_value'
    })
  })
  test('Should return an user on success', async () => {
    const { sut, loadUserByEmailAndApplicationRepositoryStub } = mockSut()
    jest.spyOn(loadUserByEmailAndApplicationRepositoryStub, 'loadUserByEmailAndApplication').mockResolvedValueOnce(null)
    const user = await sut.add(mockUserParams())
    expect(user?.id).toBeTruthy()
    expect(user?.email).toBe(mockUserParams().email)
    expect(user?.name).toBe(mockUserParams().name)
  })
})
