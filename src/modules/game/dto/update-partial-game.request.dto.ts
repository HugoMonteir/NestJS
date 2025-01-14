import { PartialType } from '@nestjs/mapped-types';
import { CreateGameRequestDto } from './create-game.request.dto';

export class UpdatePartialGameRequestDto extends PartialType(CreateGameRequestDto) {}
