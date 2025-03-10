import { UnauthorizedException } from '@nestjs/common';

export class UserNotFoundException extends UnauthorizedException {
  public constructor(message: string) {
    super(message);
  }
}
