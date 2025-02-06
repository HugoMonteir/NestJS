import { BadRequestException } from '@nestjs/common';

export class BadCredentialsException extends BadRequestException {
  public constructor(message: string) {
    super(message);
  }
}
