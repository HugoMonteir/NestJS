import { BadRequestException } from '@nestjs/common';
import { ValidationError } from '../common/interfaces';

export class ValidationException extends BadRequestException {
  public constructor(message: ValidationError[]) {
    super(message);
  }
}
