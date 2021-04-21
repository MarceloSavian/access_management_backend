import { User } from '../user/user.entity'
import { postgresHelper as sut } from './postgres-helper'

describe('Mongo Helper', () => {
  beforeAll(async () => {
    await sut.connect(String(process.env.DATABASE_URL))
  })
  afterAll(async () => {
    await sut.disconnect()
  })
  test('Should reconnect if mongodb is down', async () => {
    let userCollection = await sut.getQueryBuilder(User, 'users')
    expect(userCollection).toBeTruthy()
    await sut.disconnect()
    userCollection = await sut.getQueryBuilder()
    expect(userCollection).toBeTruthy()
  })
})
