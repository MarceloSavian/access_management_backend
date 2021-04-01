import { ApplicationModel } from '@/domain/models/application'
import { AddApplicationParams } from '@/domain/usecases/application/add-application'

export interface AddApplicationRepository {
  add: (account: AddApplicationParams) => Promise<ApplicationModel>
}
