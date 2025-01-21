import { PartialType, PickType } from '@nestjs/swagger';
import { UpdateGameRequestDto } from './update-game.request.dto';

export class UpdatePartialGameRequestDto extends PartialType(
  PickType(UpdateGameRequestDto, ['name', 'description', 'genre', 'platform'])
) {}
