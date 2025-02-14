import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../../../../src/modules/auth/auth.controller';
import { AuthService } from '../../../../src/modules/auth/auth.service';
import { TokensDto } from '../../../../src/modules/auth/dto';
import { AuthRefreshDto } from '../../../../src/modules/auth/dto/auth-refresh.dto';
import { UserResponseDto } from '../../../../src/modules/user/dto';
import { userResponseDto } from '../user/user-data-mock.constants';
import { authRefreshDto, tokensDto } from './auth-data-mock.constants';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            jwtSign: jest.fn().mockResolvedValue(tokensDto),
            jwtRefresh: jest.fn().mockResolvedValue(tokensDto)
          }
        }
      ]
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
    expect(authService).toBeDefined();
  });

  describe('login', () => {
    it('should return tokens when login is successful', async () => {
      // Arrange
      const response: TokensDto = { ...tokensDto };
      const userResponse: UserResponseDto = { ...userResponseDto };

      // Act
      const result = await authController.login(userResponse);

      // Assert
      expect(result).toEqual(response);
      expect(authService.jwtSign).toHaveBeenCalledWith(userResponse);
    });
  });

  describe('refresh', () => {
    it('should return tokens when refresh is successful', async () => {
      // Arrange
      const refreshDto: AuthRefreshDto = { ...authRefreshDto };

      // Act
      const result = await authController.refresh(refreshDto);

      // Assert
      expect(result).toEqual(tokensDto);
      expect(authService.jwtRefresh).toHaveBeenCalledWith(refreshDto);
    });
  });
});
