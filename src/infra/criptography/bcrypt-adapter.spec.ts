import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt-adapter'

type SutTypes = {
  sut: BcryptAdapter
  salt: number
}

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return await Promise.resolve('hash')
  },
  async compare (): Promise<boolean> {
    return await Promise.resolve(true)
  }
}))

const mockSut = (): SutTypes => {
  const salt = 12
  return {
    sut: new BcryptAdapter(salt),
    salt
  }
}

describe('Bcrypt Adapter', () => {
  describe('hash()', () => {
    test('Should call hash with correct value', async () => {
      const { sut, salt } = mockSut()
      const hashSpy = jest.spyOn(bcrypt, 'hash')
      await sut.hash('any_value')
      expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
    })
  })
})
