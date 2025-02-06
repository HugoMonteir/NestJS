import { BadRequestException } from '@nestjs/common';

export class DisabledUserException extends BadRequestException {
  public constructor(message: string) {
    super(message);
  }
}
