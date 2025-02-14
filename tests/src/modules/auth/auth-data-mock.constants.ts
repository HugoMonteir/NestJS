import { TokensDto } from '../../../../src/modules/auth/dto';
import { LoginDto } from '../../../../src/modules/auth/dto';
import { AuthRefreshDto } from '../../../../src/modules/auth/dto/auth-refresh.dto';
import { JwtPayload } from '../../../../src/modules/auth/interfaces';
import { user } from '../user/user-data-mock.constants';
import { JwtModuleOptions } from '@nestjs/jwt';

export const tokensDto: TokensDto = {
  accessToken: 'access-token',
  refreshToken: 'refresh-token'
};

export const loginDto: LoginDto = {
  email: 'user@example.com',
  password: 'mySecurePassword123'
};

export const authRefreshDto: AuthRefreshDto = {
  refreshToken: 'valid-refresh-token'
};

export const expiredAuthRefreshDto: AuthRefreshDto = {
  refreshToken: 'expired-refresh-token'
};

export const invalidSignatureAuthRefreshDto: AuthRefreshDto = {
  refreshToken: 'invalid-signature-token'
};

export const accessConfig: JwtModuleOptions = { signOptions: { expiresIn: '1h' } };

export const refreshConfig: JwtModuleOptions = { signOptions: { expiresIn: '7d' } };

export const accessTokenPayload: JwtPayload = {
  sub: user.id,
  type: 'access'
};

export const refreshTokenPayload: JwtPayload = {
  sub: user.id,
  type: 'refresh'
};
