import { TokensDto } from '../../../../src/modules/auth/dto';
import { LoginDto } from '../../../../src/modules/auth/dto';
import { AuthRefreshDto } from '../../../../src/modules/auth/dto/auth-refresh.dto';
import { JwtPayload } from '../../../../src/modules/auth/interfaces';
import { userMock } from '../user/user-data-mock.constants';
import { JwtModuleOptions } from '@nestjs/jwt';
import { JwtConfigInterface } from '../../../../src/common/interfaces';

export const tokensDtoMock: TokensDto = {
  accessToken: 'access-token',
  refreshToken: 'refresh-token'
};

export const loginDtoMock: LoginDto = {
  email: 'user@example.com',
  password: 'mySecurePassword123'
};

export const authRefreshDtoMock: AuthRefreshDto = {
  refreshToken: 'valid-refresh-token'
};

export const accessConfigMock: JwtModuleOptions = { signOptions: { expiresIn: '1h' } };

export const refreshConfigMock: JwtModuleOptions = { signOptions: { expiresIn: '7d' } };

export const accessTokenPayloadMock: JwtPayload = {
  sub: userMock.id,
  type: 'access'
};

export const refreshTokenPayloadMock: JwtPayload = {
  sub: userMock.id,
  type: 'refresh'
};

export const jwtConfigMock: JwtConfigInterface = {
  secret: 'mySecret',
  access: accessConfigMock,
  refresh: refreshConfigMock
};
