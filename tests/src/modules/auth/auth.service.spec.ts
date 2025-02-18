import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../../../../src/modules/auth/auth.service';
import { UserService } from '../../../../src/modules/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { JwtConfigService } from '../../../../src/modules/auth/jwt.config.service';
import {
  accessConfigMock,
  accessTokenPayloadMock,
  loginDtoMock,
  refreshConfigMock,
  refreshTokenPayloadMock,
  tokensDtoMock
} from './auth-data-mock.constants';
import { AuthRefreshDto } from '../../../../src/modules/auth/dto/auth-refresh.dto';
import { userResponseDtoMock } from '../user/user-data-mock.constants';
import { LoginDto } from '../../../../src/modules/auth/dto';
import { InvalidTokenException } from '../../../../src/exceptions';

describe('AuthService', () => {
  let authService: AuthService;
  let userService: UserService;
  let jwtService: JwtService;
  let jwtConfigService: JwtConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: {
            validateUserByEmailAndPassword: jest.fn().mockResolvedValue(userResponseDtoMock),
            findOne: jest.fn().mockResolvedValue(userResponseDtoMock)
          }
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockResolvedValue('token'),
            verifyAsync: jest.fn().mockResolvedValue(refreshTokenPayloadMock)
          }
        },
        {
          provide: JwtConfigService,
          useValue: {
            getAccessConfig: jest.fn().mockReturnValue(accessConfigMock),
            getRefreshConfig: jest.fn().mockReturnValue(refreshConfigMock)
          }
        }
      ]
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
    jwtService = module.get<JwtService>(JwtService);
    jwtConfigService = module.get<JwtConfigService>(JwtConfigService);
  });

  it('should be defined', () => {
    // Assert
    expect(authService).toBeDefined();
    expect(userService).toBeDefined();
    expect(jwtService).toBeDefined();
    expect(jwtConfigService).toBeDefined();
  });

  describe('validateUser', () => {
    it('should call userService.validateUserByEmailAndPassword and return user', async () => {
      // Arrange
      const loginInfo: LoginDto = { ...loginDtoMock };

      // Act
      const result = await authService.validateUser(loginInfo.email, loginInfo.password);

      // Assert
      expect(userService.validateUserByEmailAndPassword).toHaveBeenCalledWith(loginInfo.email, loginInfo.password);
      expect(userService.validateUserByEmailAndPassword).toHaveBeenCalledTimes(1);
      expect(result).toEqual(userResponseDtoMock);
    });
  });

  describe('jwtSign', () => {
    it('should return tokens', async () => {
      // Arrange
      jwtService.sign = jest.fn().mockReturnValueOnce(tokensDtoMock.accessToken).mockReturnValue(tokensDtoMock.refreshToken);

      // Act
      const result = await authService.jwtSign(userResponseDtoMock);

      // Assert
      expect(jwtService.sign).toHaveBeenCalledWith(accessTokenPayloadMock, accessConfigMock.signOptions);
      expect(jwtService.sign).toHaveBeenCalledWith(refreshTokenPayloadMock, refreshConfigMock.signOptions);
      expect(jwtService.sign).toHaveBeenCalledTimes(2);
      expect(result).toEqual(tokensDtoMock);
    });
  });

  describe('jwtRefresh', () => {
    it('should return tokens when refresh token is valid', async () => {
      // Arrange
      const validRefreshDto: AuthRefreshDto = { refreshToken: 'valid-refresh-token' };
      jest.spyOn(authService, 'jwtSign').mockResolvedValue(tokensDtoMock);

      // Act
      const result = await authService.jwtRefresh(validRefreshDto);

      // Assert
      expect(jwtService.verifyAsync).toHaveBeenCalledWith(validRefreshDto.refreshToken, refreshConfigMock.verifyOptions);
      expect(jwtService.verifyAsync).toHaveBeenCalledTimes(1);
      expect(userService.findOne).toHaveBeenCalledWith(refreshTokenPayloadMock.sub);
      expect(userService.findOne).toHaveBeenCalledTimes(1);
      expect(authService.jwtSign).toHaveBeenCalledTimes(1);
      expect(result).toEqual(tokensDtoMock);
    });

    it('should throw InvalidTokenException if refresh token is expired', async () => {
      // Arrange
      const expiredRefreshToken: AuthRefreshDto = { refreshToken: 'expired-refresh-token' };
      const error = { name: 'TokenExpiredError' };

      jwtService.verifyAsync = jest.fn().mockRejectedValue(error);

      // Act & Assert
      await expect(authService.jwtRefresh(expiredRefreshToken)).rejects.toThrow(new InvalidTokenException('Refresh token has expired'));
      expect(jwtService.verifyAsync).toHaveBeenCalledWith(expiredRefreshToken.refreshToken, refreshConfigMock.verifyOptions);
      expect(jwtService.verifyAsync).toHaveBeenCalledTimes(1);
    });

    it('should throw InvalidTokenException if refresh token has invalid signature', async () => {
      // Arrange
      const invalidSignatureDto: AuthRefreshDto = { refreshToken: 'invalid-signature-token' };
      const error = { name: 'JsonWebTokenError' };

      jwtService.verifyAsync = jest.fn().mockRejectedValue(error);

      // Act & Assert
      await expect(authService.jwtRefresh(invalidSignatureDto)).rejects.toThrow(
        new InvalidTokenException('Invalid refresh token signature')
      );
      expect(jwtService.verifyAsync).toHaveBeenCalledWith(invalidSignatureDto.refreshToken, refreshConfigMock.verifyOptions);
      expect(jwtService.verifyAsync).toHaveBeenCalledTimes(1);
    });

    it('should throw InvalidTokenException with unknown error', async () => {
      // Arrange
      const invalidSignatureDto: AuthRefreshDto = { refreshToken: 'invalid-signature-token' };
      const error = { name: 'error' };

      jwtService.verifyAsync = jest.fn().mockRejectedValue(error);

      // Act & Assert
      await expect(authService.jwtRefresh(invalidSignatureDto)).rejects.toThrow(new InvalidTokenException('Invalid refresh token'));
      expect(jwtService.verifyAsync).toHaveBeenCalledWith(invalidSignatureDto.refreshToken, refreshConfigMock.verifyOptions);
      expect(jwtService.verifyAsync).toHaveBeenCalledTimes(1);
    });

    it('should throw InvalidTokenException if verified payload type is not refresh', async () => {
      // Arrange
      const validAccessToken: AuthRefreshDto = { refreshToken: 'valid-refresh-token' };

      jwtService.verifyAsync = jest.fn().mockResolvedValue(accessTokenPayloadMock);

      // Act & Assert
      await expect(authService.jwtRefresh(validAccessToken)).rejects.toThrow(new InvalidTokenException('Invalid refresh token'));
      expect(jwtService.verifyAsync).toHaveBeenCalledWith(validAccessToken.refreshToken, refreshConfigMock.verifyOptions);
      expect(jwtService.verifyAsync).toHaveBeenCalledTimes(1);
    });

    it('should throw InvalidTokenException if user is not found', async () => {
      // Arrange
      const validRefreshToken: AuthRefreshDto = { refreshToken: 'valid-refresh-token' };
      const payload = { ...refreshTokenPayloadMock, sub: -1 };
      jwtService.verifyAsync = jest.fn().mockResolvedValue(payload);
      userService.findOne = jest.fn().mockResolvedValue(null);

      // Act & Assert
      await expect(authService.jwtRefresh(validRefreshToken)).rejects.toThrow(
        new InvalidTokenException('User not found for this refresh token')
      );
      expect(jwtService.verifyAsync).toHaveBeenCalledWith(validRefreshToken.refreshToken, refreshConfigMock.verifyOptions);
      expect(jwtService.verifyAsync).toHaveBeenCalledTimes(1);
      expect(userService.findOne).toHaveBeenCalledWith(payload.sub);
      expect(userService.findOne).toHaveBeenCalledTimes(1);
    });
  });
});
