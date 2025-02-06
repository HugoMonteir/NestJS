import { UnauthorizedException } from '@nestjs/common';

export class InvalidTokenException extends UnauthorizedException {
  public constructor(message: string) {
    super(message);
  }
}
