import { UnauthorizedException } from '@nestjs/common';

export class BadCredentialsException extends UnauthorizedException {
  public constructor(message: string) {
    super(message);
  }
}
