import { AddApplication } from '@/domain/usecases/application/add-application'
import { badRequest, serverError } from '@/presentation/helpers/http/http-helper'
import { HttpRequest } from '@/presentation/protocols/http'
import { Validation } from '@/presentation/protocols/validation'
import { mockAddApplication } from '@/presentation/test/mock-add-application'
import { mockValidation } from '@/presentation/test/mock-validation'
import { AddApplicationController } from './add-application-controller'

type SutTypes = {
  sut: AddApplicationController
  validationStub: Validation
  addApplicationStub: AddApplication
}

const mockRequest = (): HttpRequest => ({
  body: {
    name: 'any_name'
  }
})

const mockSut = (): SutTypes => {
  const validationStub = mockValidation()
  const addApplicationStub = mockAddApplication()
  return {
    sut: new AddApplicationController(validationStub, addApplicationStub),
    validationStub,
    addApplicationStub
  }
}

describe('AddApplication Controller', () => {
  test('Should call Validation with correct values', async () => {
    const { sut, validationStub } = mockSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })
  test('Should retrun 400 if Validation fails', async () => {
    const { sut, validationStub } = mockSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new Error())
    const httpRequest = mockRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new Error()))
  })
  test('Should call AddApplication with correct values', async () => {
    const { sut, addApplicationStub } = mockSut()
    const addSpy = jest.spyOn(addApplicationStub, 'add')
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(addSpy).toHaveBeenCalledWith(httpRequest.body)
  })
  test('Should return 500 if AddApplication throws', async () => {
    const { sut, addApplicationStub } = mockSut()
    jest.spyOn(addApplicationStub, 'add').mockRejectedValueOnce(new Error())
    const httpRequest = mockRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
