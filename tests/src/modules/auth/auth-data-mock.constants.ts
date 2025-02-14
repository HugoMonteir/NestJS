import { TokensDto } from '../../../../src/modules/auth/dto';
import { LoginDto } from '../../../../src/modules/auth/dto';
import { AuthRefreshDto } from '../../../../src/modules/auth/dto/auth-refresh.dto';

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
