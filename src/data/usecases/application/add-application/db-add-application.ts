import { Hasher } from '@/data/protocols/criptography/hasher'
import { AddApplicationRepository } from '@/data/protocols/db/application/add-application-repository'
import { UpdateApplicationRepository } from '@/data/protocols/db/application/update-application-repository'
import { ApplicationModel } from '@/domain/models/application'
import { AddApplication, AddApplicationParams } from '@/domain/usecases/application/add-application'

export class DbAddApplication implements AddApplication {
  constructor (
    private readonly addApplicationRepository: AddApplicationRepository,
    private readonly hasher: Hasher,
    private readonly updateApplicationRepository: UpdateApplicationRepository
  ) {}

  async add (applicationParams: AddApplicationParams): Promise<ApplicationModel> {
    const application = await this.addApplicationRepository.add(applicationParams)
    const token = await this.hasher.hash(String(application.id))
    return await this.updateApplicationRepository.update(
      application.id,
      {
        name: application.name,
        token
      }
    )
  }
}
