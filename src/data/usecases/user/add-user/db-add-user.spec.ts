import { Hasher } from '@/data/protocols/criptography/hasher'
import { mockHasher } from '@/data/test/mock-criptography'
import { mockUserParams } from '@/domain/test/mock-user'
import { DbAddUser } from './db-add-user'

type SutTypes = {
  sut: DbAddUser
  hasherStub: Hasher
}

const mockSut = (): SutTypes => {
  const hasherStub = mockHasher()
  return {
    sut: new DbAddUser(hasherStub),
    hasherStub
  }
}

describe('AddUser UseCase', () => {
  test('Should call Hasher with correct password', async () => {
    const { sut, hasherStub } = mockSut()

    const encryptSpy = jest.spyOn(hasherStub, 'hash')
    await sut.add(mockUserParams())
    expect(encryptSpy).toHaveBeenCalledWith(mockUserParams().password)
  })
})
