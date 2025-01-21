import { ValidationError } from 'class-validator';
import { ValidationErrorProperty } from '../common/interfaces';
import { ValidationException } from './validation.exception';

export function validationExceptionFactory(errors: ValidationError[]): ValidationException {
  const result: ValidationErrorProperty[] = errors.map((error: ValidationError) => ({
    field: error.property,
    message: error.constraints[Object.keys(error.constraints)[0]]
  }));

  return new ValidationException(result);
}
