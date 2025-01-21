import { BadRequestException } from '@nestjs/common';
import { ValidationErrorProperty } from '../common/interfaces';

export class ValidationException extends BadRequestException {
  public constructor(message: ValidationErrorProperty[]) {
    super(message);
  }
}
