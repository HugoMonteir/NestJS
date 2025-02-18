import { JwtStrategy } from '../../../../src/common/strategies';
import { InvalidTokenException } from '../../../../src/exceptions';
import { JwtPayload } from '../../../../src/modules/auth/interfaces';
import { UserService } from '../../../../src/modules/user/user.service';
import { accessTokenPayloadMock, jwtConfigMock, refreshTokenPayloadMock } from '../../modules/auth/auth-data-mock.constants';
import { userResponseDtoMock } from '../../modules/user/user-data-mock.constants';

describe('JwtStrategy', () => {
  let jwtStrategy: JwtStrategy;
  let userService: { findOne: jest.Mock };

  beforeEach(() => {
    userService = { findOne: jest.fn().mockResolvedValue(userResponseDtoMock) };
    jwtStrategy = new JwtStrategy(jwtConfigMock, userService as unknown as UserService);
  });

  it('should return user when payload is valid', async () => {
    // Arrange
    const payload: JwtPayload = accessTokenPayloadMock;

    // Act
    const result = await jwtStrategy.validate(payload);

    // Assert
    expect(userService.findOne).toHaveBeenCalledWith(payload.sub);
    expect(userService.findOne).toHaveBeenCalledTimes(1);
    expect(result).toEqual(userResponseDtoMock);
  });

  it('should throw InvalidTokenException when payload type is not "access"', async () => {
    // Act & Assert
    await expect(jwtStrategy.validate(refreshTokenPayloadMock)).rejects.toThrow(new InvalidTokenException('Invalid access Token'));
  });

  it('should throw InvalidTokenException when user is not found', async () => {
    // Arrange
    const payload: JwtPayload = accessTokenPayloadMock;

    userService.findOne.mockResolvedValueOnce(null);

    // Act & Assert
    await expect(jwtStrategy.validate(payload)).rejects.toThrow(new InvalidTokenException('Invalid access Token'));
    expect(userService.findOne).toHaveBeenCalledWith(payload.sub);
    expect(userService.findOne).toHaveBeenCalledTimes(1);
  });
});
