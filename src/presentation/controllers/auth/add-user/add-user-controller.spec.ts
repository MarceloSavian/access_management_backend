import { mockUserModel } from '@/domain/test/mock-user'
import { AddUser } from '@/domain/usecases/user/add-user'
import { badRequest, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { HttpRequest } from '@/presentation/protocols/http'
import { Validation } from '@/presentation/protocols/validation'
import { mockAddUser } from '@/presentation/test/mock-add-user'
import { mockValidation } from '@/presentation/test/mock-validation'
import { AddUserController } from './add-user-controller'

type SutTypes = {
  sut: AddUserController
  validationStub: Validation
  addUserStub: AddUser
}

const mockRequest = (): HttpRequest => ({
  body: {
    name: 'any_name',
    email: 'any_email@email.com',
    password: 'any_password',
    application: 1,
    roles: [1]
  }
})

const mockSut = (): SutTypes => {
  const validationStub = mockValidation()
  const addUserStub = mockAddUser()
  return {
    sut: new AddUserController(validationStub, addUserStub),
    validationStub,
    addUserStub
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
  test('Should call AddUser with correct values', async () => {
    const { sut, addUserStub } = mockSut()
    const addSpy = jest.spyOn(addUserStub, 'add')
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(addSpy).toHaveBeenCalledWith(httpRequest.body)
  })
  test('Should return 500 if AddApplication throws', async () => {
    const { sut, addUserStub } = mockSut()
    jest.spyOn(addUserStub, 'add').mockRejectedValueOnce(new Error())
    const httpRequest = mockRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(serverError(new Error()))
  })
  test('Should return 200 on success', async () => {
    const { sut } = mockSut()
    const httpRequest = mockRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(ok(mockUserModel()))
  })
})
