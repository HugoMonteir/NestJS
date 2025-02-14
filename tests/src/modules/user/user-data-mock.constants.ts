import { User } from '../../../../src/modules/user/entities';
import { CreateUserDto, UserDto, UserResponseDto } from '../../../../src/modules/user/dto';

export const user: User = {
  id: 1,
  username: 'huguito',
  email: 'hugo@gmail.com',
  password: '$2b$10$wFqBCA1rqa2IJxOn5x5IJeW3Wdl5a..Y40EjihtkD1KILLptrvHo.', // Hugo123#
  salt: '$2b$10$wFqBCA1rqa2IJxOn5x5IJe',
  role: 'admin',
  status: 'active'
};

export const userDto: UserDto = { ...user };

export const userResponseDto: UserResponseDto = {
  id: userDto.id,
  username: userDto.username,
  email: userDto.email,
  role: userDto.role,
  status: userDto.status
};

export const createUserDto: CreateUserDto = {
  username: user.username,
  email: user.email,
  password: 'Hugo123#',
  status: user.status,
  role: user.role
};
