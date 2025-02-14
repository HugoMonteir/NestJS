import { PickType } from '@nestjs/swagger';
import { UserDto } from './user.dto';

export class UserResponseDto extends PickType(UserDto, ['id', 'username', 'email', 'status', 'role']) {}
