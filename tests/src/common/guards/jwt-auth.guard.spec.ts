import { JwtAuthGuard } from '../../../../src/common/guards';
import { InvalidTokenException } from '../../../../src/exceptions';
import { ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

describe('JwtAuthGuard', () => {
  let jwtAuthGuard: JwtAuthGuard;

  beforeEach(() => {
    jwtAuthGuard = new JwtAuthGuard();
  });

  describe('canActivate', () => {
    it('should call super.canActivate and return its result (true)', async () => {
      // Arrange
      const canActivateSpy = jest.spyOn(AuthGuard('jwt').prototype, 'canActivate').mockResolvedValue(true);
      const mockContext = {} as ExecutionContext;

      // Act
      const result = await jwtAuthGuard.canActivate(mockContext);

      // Assert
      expect(canActivateSpy).toHaveBeenCalledWith(mockContext);
      expect(result).toBe(true);
    });
  });

  describe('handleRequest', () => {
    it('should return the user when no error and valid user provided', () => {
      // Arrange
      const user = { id: 1, name: 'Test User' };

      // Act
      const result = jwtAuthGuard.handleRequest(null, user, null, {} as ExecutionContext);

      // Assert
      expect(result).toEqual(user);
    });

    it('should throw InvalidTokenException when info message is "No auth token"', () => {
      // Act & Assert
      expect(() => jwtAuthGuard.handleRequest(null, null, { message: 'No auth token' }, {} as ExecutionContext)).toThrow(
        new InvalidTokenException('Access Token is missing')
      );
    });

    it('should throw InvalidTokenException when info message is "jwt expired"', () => {
      // Act & Assert
      expect(() => jwtAuthGuard.handleRequest(null, null, { message: 'jwt expired' }, {} as ExecutionContext)).toThrow(
        new InvalidTokenException('')
      );
    });

    it('should throw InvalidTokenException when info message is "invalid token"', () => {
      // Act & Assert
      expect(() => jwtAuthGuard.handleRequest(null, null, { message: 'invalid token' }, {} as ExecutionContext)).toThrow(
        new InvalidTokenException('Invalid Access token')
      );
    });

    it('should throw the provided error if error is present', () => {
      // Arrange
      const error = new Error('Test error');

      // Act & Assert
      expect(() => jwtAuthGuard.handleRequest(error, null, null, {} as ExecutionContext)).toThrow(error);
    });

    it('should throw InvalidTokenException when user is not provided', () => {
      // Act & Assert
      expect(() => jwtAuthGuard.handleRequest(null, null, null, {} as ExecutionContext)).toThrow(
        new InvalidTokenException('Invalid Access token')
      );
    });
  });
});
