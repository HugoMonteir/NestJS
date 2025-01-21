import { PickType } from '@nestjs/swagger';
import { CreateGameRequestDto } from './create-game.request.dto';

export class UpdateGameRequestDto extends PickType(CreateGameRequestDto, ['name', 'description', 'genre', 'platform']) {}
