import { AddApplicationRepository } from '@/data/protocols/db/application/add-application-repository'
import { ApplicationModel } from '@/domain/models/application'
import { AddApplication, AddApplicationParams } from '@/domain/usecases/application/add-application'

export class DbAddApplication implements AddApplication {
  constructor (
    private readonly addApplicationRepository: AddApplicationRepository
  ) {}

  async add (application: AddApplicationParams): Promise<ApplicationModel> {
    return await this.addApplicationRepository.add(application)
  }
}
