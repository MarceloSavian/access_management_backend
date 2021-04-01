import { AddApplication } from '@/domain/usecases/application/add-application'
import { badRequest, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { Controller } from '@/presentation/protocols/controller'
import { HttpRequest, HttpResponse } from '@/presentation/protocols/http'
import { Validation } from '@/presentation/protocols/validation'

export class AddApplicationController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addApplication: AddApplication
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) return badRequest(error)
      const { name } = httpRequest.body
      await this.addApplication.add({ name })
      return ok({})
    } catch (error) {
      return serverError(error)
    }
  }
}
