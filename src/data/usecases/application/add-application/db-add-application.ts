import { Hasher } from '@/data/protocols/criptography/hasher'
import { AddApplicationRepository } from '@/data/protocols/db/application/add-application-repository'
import { ApplicationModel } from '@/domain/models/application'
import { AddApplication, AddApplicationParams } from '@/domain/usecases/application/add-application'

export class DbAddApplication implements AddApplication {
  constructor (
    private readonly addApplicationRepository: AddApplicationRepository,
    private readonly hasher: Hasher
  ) {}

  async add (applicationParams: AddApplicationParams): Promise<ApplicationModel> {
    const application = await this.addApplicationRepository.add(applicationParams)
    await this.hasher.hash({ application: application.id })
    return application
  }
}
