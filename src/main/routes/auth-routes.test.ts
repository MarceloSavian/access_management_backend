
import { postgresHelper } from '@/infra/db/postgres/helpers/postgres-helper'
import { User } from '@/infra/db/postgres/user/user.entity'
import { EntitySchema, SelectQueryBuilder } from 'typeorm'
import request from 'supertest'
import app from '../config/app'
import { Application } from '@/infra/db/postgres/application/application.entity'

let userCollection: SelectQueryBuilder<EntitySchema>
let appCollection: SelectQueryBuilder<EntitySchema>

export const insertApplication = async (): Promise<number> => {
  const query = await (await postgresHelper.getQueryBuilder(Application, 'applications'))
    .insert()
    .into('applications')
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

describe('Auth routes', () => {
  beforeAll(async () => {
    await postgresHelper.connect(String(process.env.DATABASE_URL))
  })
  afterAll(async () => {
    await postgresHelper.disconnect()
  })
  beforeEach(async () => {
    appCollection = await postgresHelper.getQueryBuilder(Application, 'applications')
    await appCollection.softDelete()
    userCollection = await postgresHelper.getQueryBuilder(User, 'users')
    await userCollection.softDelete()
  })
  describe('POST /signup', () => {
    test('Should return 200 on applications', async () => {
      const id = await insertApplication()
      await request(app)
        .post('/api/signup')
        .send({
          name: 'Marcelo',
          email: 'marcelo@savian.com',
          application: id,
          password: 'any_password',
          roles: [1]
        })
        .expect(200)
    })
  })
})
