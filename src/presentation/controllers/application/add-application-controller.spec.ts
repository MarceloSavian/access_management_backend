import { HttpRequest } from '@/presentation/protocols/http'
import { Validation } from '@/presentation/protocols/validation'
import { mockValidation } from '@/presentation/test/mock-validation'
import { AddApplicationController } from './add-application-controller'

type SutTypes = {
  sut: AddApplicationController
  validationStub: Validation
}

const mockRequest = (): HttpRequest => ({
  body: {
    name: 'any_name'
  }
})

const mockSut = (): SutTypes => {
  const validationStub = mockValidation()
  return {
    sut: new AddApplicationController(validationStub),
    validationStub
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
})
