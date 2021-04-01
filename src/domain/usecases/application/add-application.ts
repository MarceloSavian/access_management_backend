import { ApplicationModel } from '@/domain/models/application'

export type AddApplicationParams = {
  name: string
}

export interface AddApplication {
  add: (application: AddApplicationParams) => Promise<ApplicationModel>
}
