import { makeDbAddApplication } from '@/main/factories/usecases/application/add-application/add-application-factory'
import { AddApplicationController } from '@/presentation/controllers/application/add-application/add-application-controller'
import { Controller } from '@/presentation/protocols/controller'
import { makeAddApplicationValidation } from './add-application-validation'

export const makeApplicationController = (): Controller => {
  return new AddApplicationController(makeAddApplicationValidation(), makeDbAddApplication())
}
