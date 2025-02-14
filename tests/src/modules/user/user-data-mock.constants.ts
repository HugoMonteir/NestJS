import { User } from '../../../../src/modules/user/entities';
import { CreateUserDto, UserDto } from '../../../../src/modules/user/dto';

export const user: User = {
  id: 1,
  username: 'huguito',
  email: 'hugo@gmail.com',
  password: '$2b$10$wFqBCA1rqa2IJxOn5x5IJeW3Wdl5a..Y40EjihtkD1KILLptrvHo.', // Hugo123#
  salt: '$2b$10$wFqBCA1rqa2IJxOn5x5IJe',
  role: 'admin',
  status: 'active'
};

export const userResponseDto: UserDto = { ...user };

export const createUserDto: CreateUserDto = { ...user, password: 'Hugo123#' };
