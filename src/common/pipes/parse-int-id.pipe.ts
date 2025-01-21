import { Injectable, PipeTransform } from '@nestjs/common';
import { BadFormatIdException } from '../../exceptions';

@Injectable()
export class ParseIntIdPipe implements PipeTransform {
  public transform(value: string): number {
    const isPositiveInteger = /^[1-9]\d*$/;

    if (!isPositiveInteger.test(value)) {
      throw new BadFormatIdException(`Invalid ID format. '${value}' must be a positive integer.`);
    }

    return parseInt(value, 10);
  }
}
