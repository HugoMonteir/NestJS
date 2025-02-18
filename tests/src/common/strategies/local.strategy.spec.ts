import { LocalStrategy } from '../../../../src/common/strategies';
import { DisabledUserException } from '../../../../src/exceptions';
import { userResponseDtoMock } from '../../modules/user/user-data-mock.constants';
import { AuthService } from '../../../../src/modules/auth/auth.service';
import { loginDtoMock } from '../../modules/auth/auth-data-mock.constants';

describe('LocalStrategy', () => {
  let localStrategy: LocalStrategy;
  let authService: { validateUser: jest.Mock };

  beforeEach(() => {
    authService = {
      validateUser: jest.fn().mockResolvedValue(userResponseDtoMock)
    };
    localStrategy = new LocalStrategy(authService as never as AuthService);
  });

  it('should return user if credentials are valid and user is active', async () => {
    // Act
    const result = await localStrategy.validate(loginDtoMock.email, loginDtoMock.password);

    // Assert
    expect(authService.validateUser).toHaveBeenCalledWith(loginDtoMock.email, loginDtoMock.password);
    expect(result).toEqual(userResponseDtoMock);
  });

  it('should throw DisabledUserException if user is not active', async () => {
    // Arrange
    authService.validateUser.mockResolvedValueOnce({ ...userResponseDtoMock, status: 'inactive' });

    // Act & Assert
    await expect(localStrategy.validate(loginDtoMock.email, loginDtoMock.password)).rejects.toThrow(
      new DisabledUserException('User is not active')
    );
  });
});
