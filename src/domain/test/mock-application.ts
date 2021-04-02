import { ApplicationModel } from '../models/application'
import { AddApplicationParams } from '../usecases/application/add-application'
import { UpdateApplicationParams } from '../usecases/application/updated-application'

export const mockApplicationModel = (): ApplicationModel => ({
  id: 1,
  token: 'any_token',
  createdAt: new Date(),
  updatedAt: new Date(),
  ...mockApplicationParams()
})

export const mockUpdateApplicationParams = (): UpdateApplicationParams => ({
  token: 'any_token',
  name: 'any_name'
})

export const mockApplicationParams = (): AddApplicationParams => ({
  name: 'any_name'
})
