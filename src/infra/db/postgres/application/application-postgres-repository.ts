import { AddApplicationRepository } from '@/data/protocols/db/application/add-application-repository'
import { ApplicationModel } from '@/domain/models/application'
import { AddApplicationParams } from '@/domain/usecases/application/add-application'
import { postgresHelper } from '../helpers/postgres-helper'
import { Application } from './application.entity'
const tableName = 'applications'

export class ApplicationRepository implements AddApplicationRepository {
  async add (applicationParams: AddApplicationParams): Promise<ApplicationModel> {
    const createdAt = new Date()
    const updatedAt = new Date()
    const token = ''
    const query = await (await postgresHelper.getQueryBuilder(Application, tableName))
      .insert()
      .into(tableName)
      .values([
        {
          name: applicationParams.name,
          token,
          createdAt,
          updatedAt
        }
      ])
      .returning('id')
      .execute()
    return { id: query.raw[0].id, ...applicationParams, createdAt, updatedAt, token }
  }
}
