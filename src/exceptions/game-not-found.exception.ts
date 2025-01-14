import { NotFoundException } from '@nestjs/common';

export class GameNotFoundException extends NotFoundException {
  public constructor(message: string) {
    super(message);
  }
}
