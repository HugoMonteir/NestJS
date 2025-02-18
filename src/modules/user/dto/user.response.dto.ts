import { PickType } from '@nestjs/swagger';
import { UserDto } from './user.dto';
import { Exclude } from 'class-transformer';

@Exclude()
export class UserResponseDto extends PickType(UserDto, ['id', 'username', 'email', 'status', 'role']) {}
