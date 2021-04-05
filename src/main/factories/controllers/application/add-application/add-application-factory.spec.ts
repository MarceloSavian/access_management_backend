import { RequiredFieldValidation, ValidationComposite } from '../../../../../validation/validators'
import { Validation } from '../../../../../presentation/protocols/validation'
import { makeAddApplicationValidation } from './add-application-validation'

jest.mock('../../../../../validation/validators/validation-composite')

describe('Login validation', () => {
  test('Should call AddApplication with all validations', () => {
    makeAddApplicationValidation()
    const validations: Validation[] = []

    for (const field of ['name']) {
      validations.push(new RequiredFieldValidation(field))
    }

    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
