import { EmailValidatorAdapter } from '@/infra/validators/email-validator-adapter'
import { Validation } from '@/presentation/protocols/validation'
import { EmailValidation, RequiredFieldValidation, ValidationComposite } from '@/validation/validators'

export const makeAddUserValidation = (): ValidationComposite => {
  const validations: Validation[] = []

  for (const field of ['name', 'email', 'password', 'application', 'roles']) {
    validations.push(new RequiredFieldValidation(field))
  }
  const emailValidatorAdapter = new EmailValidatorAdapter()
  validations.push(new EmailValidation(emailValidatorAdapter, 'email'))
  return new ValidationComposite(validations)
}
