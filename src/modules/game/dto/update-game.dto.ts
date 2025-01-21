import { PickType } from '@nestjs/swagger';
import { CreateGameDto } from './create-game.dto';

export class UpdateGameDto extends PickType(CreateGameDto, ['name', 'description', 'genre', 'platform']) {}
