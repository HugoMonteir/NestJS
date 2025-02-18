import { User } from '../../../../src/modules/user/entities';
import { CreateUserDto, UserDto, UserResponseDto } from '../../../../src/modules/user/dto';

export const userMock: User = {
  id: 1,
  username: 'huguito',
  email: 'hugo@gmail.com',
  password: '$2b$10$wFqBCA1rqa2IJxOn5x5IJeW3Wdl5a..Y40EjihtkD1KILLptrvHo.', // Hugo123#
  salt: '$2b$10$wFqBCA1rqa2IJxOn5x5IJe',
  role: 'admin',
  status: 'active'
};

export const userDtoMock: UserDto = { ...userMock };

export const userResponseDtoMock: UserResponseDto = {
  id: userDtoMock.id,
  username: userDtoMock.username,
  email: userDtoMock.email,
  role: userDtoMock.role,
  status: userDtoMock.status
};

export const createUserDtoMock: CreateUserDto = {
  username: userMock.username,
  email: userMock.email,
  password: 'Hugo123#',
  status: userMock.status,
  role: userMock.role
};
