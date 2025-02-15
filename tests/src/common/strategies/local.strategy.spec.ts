import { LocalStrategy } from '../../../../src/common/strategies';
import { DisabledUserException } from '../../../../src/exceptions';
import { userResponseDto } from '../../modules/user/user-data-mock.constants';
import { AuthService } from '../../../../src/modules/auth/auth.service';
import { loginDto } from '../../modules/auth/auth-data-mock.constants';

describe('LocalStrategy', () => {
  let localStrategy: LocalStrategy;
  let authService: { validateUser: jest.Mock };

  beforeEach(() => {
    authService = {
      validateUser: jest.fn().mockResolvedValue(userResponseDto)
    };
    localStrategy = new LocalStrategy(authService as never as AuthService);
  });

  it('should return user if credentials are valid and user is active', async () => {
    // Act
    const result = await localStrategy.validate(loginDto.email, loginDto.password);

    // Assert
    expect(authService.validateUser).toHaveBeenCalledWith(loginDto.email, loginDto.password);
    expect(result).toEqual(userResponseDto);
  });

  it('should throw DisabledUserException if user is not active', async () => {
    // Arrange
    authService.validateUser.mockResolvedValueOnce({ ...userResponseDto, status: 'inactive' });

    // Act & Assert
    await expect(localStrategy.validate(loginDto.email, loginDto.password)).rejects.toThrow(
      new DisabledUserException('User is not active')
    );
  });
});
