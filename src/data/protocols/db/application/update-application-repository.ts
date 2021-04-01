import { ApplicationModel } from '@/domain/models/application'
import { UpdateApplicationParams } from '@/domain/usecases/application/updated-application'

export interface UpdateApplicationRepository {
  update: (id: string, application: UpdateApplicationParams) => Promise<ApplicationModel>
}
