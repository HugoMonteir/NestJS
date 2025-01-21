import { BadRequestException } from '@nestjs/common';

export class BadFormatIdException extends BadRequestException {
  public constructor(message: string) {
    super(message);
  }
}
