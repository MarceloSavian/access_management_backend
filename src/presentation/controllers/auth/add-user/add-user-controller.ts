import { AddUser } from '@/domain/usecases/user/add-user'
import { EmailInUseError } from '@/presentation/errors/email-in-use-error'
import { badRequest, forbidden, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { Controller } from '@/presentation/protocols/controller'
import { HttpRequest, HttpResponse } from '@/presentation/protocols/http'
import { Validation } from '@/presentation/protocols/validation'

export class AddUserController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addUser: AddUser
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) return badRequest(error)
      const { name, email, password, application, roles } = httpRequest.body
      const user = await this.addUser.add({ name, email, password, application, roles })

      if (!user) return forbidden(new EmailInUseError())

      return ok(user)
    } catch (error) {
      return serverError(error)
    }
  }
}
