import { EmailValidation, RequiredFieldValidation, ValidationComposite } from '@/validation/validators'
import { Validation } from '@/presentation/protocols/validation'
import { makeAddUserValidation } from './add-user-validation'
import { EmailValidatorAdapter } from '@/infra/validators/email-validator-adapter'

jest.mock('../../../../../validation/validators/validation-composite')

describe('Login validation', () => {
  test('Should call AddUser with all validations', () => {
    makeAddUserValidation()
    const validations: Validation[] = []

    for (const field of ['name', 'email', 'password', 'application', 'roles']) {
      validations.push(new RequiredFieldValidation(field))
    }
    const emailValidatorAdapter = new EmailValidatorAdapter()
    validations.push(new EmailValidation(emailValidatorAdapter, 'email'))

    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
