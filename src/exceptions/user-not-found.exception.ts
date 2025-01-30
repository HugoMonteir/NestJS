import { NotFoundException } from '@nestjs/common';

export class UserNotFoundException extends NotFoundException {
  public constructor(message: string) {
    super(message);
  }
}
