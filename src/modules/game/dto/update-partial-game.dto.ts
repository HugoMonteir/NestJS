import { PartialType, PickType } from '@nestjs/swagger';
import { UpdateGameDto } from './update-game.dto';

export class UpdatePartialGameDto extends PartialType(
  PickType(UpdateGameDto, ['name', 'description', 'genre', 'platform'])
) {}
