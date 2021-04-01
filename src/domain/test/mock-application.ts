import { ApplicationModel } from '../models/application'
import { AddApplicationParams } from '../usecases/application/add-application'

export const mockApplicationModel = (): ApplicationModel => ({
  id: 'any_id',
  token: 'any_token',
  createdAt: new Date(),
  updatedAt: new Date(),
  ...mockApplicationParams()
})

export const mockApplicationParams = (): AddApplicationParams => ({
  name: 'any_name'
})
