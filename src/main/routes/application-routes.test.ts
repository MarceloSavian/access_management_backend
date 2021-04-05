import { postgresHelper } from '@/infra/db/postgres/helpers/postgres-helper'
import request from 'supertest'
import app from '../config/app'
import MockDate from 'mockdate'
import { Application } from '@/infra/db/postgres/application/application.entity'
import { EntitySchema, SelectQueryBuilder } from 'typeorm'

let applicationCollection: SelectQueryBuilder<EntitySchema>

describe('Auth routes', () => {
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
    applicationCollection = await postgresHelper.getQueryBuilder(Application, 'applications')
    await applicationCollection.delete().from(Application).execute()
  })

  describe('POST /applications', () => {
    test('Should return 200 on applications', async () => {
      await request(app)
        .post('/api/applications')
        .send({
          name: 'Marcelo'
        })
        .expect(200)
    })
  })
})
