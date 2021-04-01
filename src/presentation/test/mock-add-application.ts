import { ApplicationModel } from '@/domain/models/application'
import { mockApplicationModel } from '@/domain/test/mock-application'
import { AddApplication } from '@/domain/usecases/application/add-application'

export const mockAddApplication = (): AddApplication => {
  class AddApplicationStub implements AddApplication {
    async add (): Promise<ApplicationModel> {
      return await Promise.resolve(mockApplicationModel())
    }
  }
  return new AddApplicationStub()
}
