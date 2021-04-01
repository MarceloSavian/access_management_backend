import { ApplicationModel } from '@/domain/models/application'
import { mockApplicationModel } from '@/domain/test/mock-application'
import { AddApplicationRepository } from '../protocols/db/application/add-application-repository'

export const mockAddApplicationRepository = (): AddApplicationRepository => {
  class AddApplicationRepositoryStub implements AddApplicationRepository {
    async add (): Promise<ApplicationModel> {
      return await Promise.resolve(mockApplicationModel())
    }
  }
  return new AddApplicationRepositoryStub()
}
