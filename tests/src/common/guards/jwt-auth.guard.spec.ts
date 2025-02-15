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
      const canActivateSpy = jest.spyOn(AuthGuard('jwt').prototype, 'canActivate').mockResolvedValue(true);

      const mockContext = {} as ExecutionContext;
      const result = await jwtAuthGuard.canActivate(mockContext);

      expect(canActivateSpy).toHaveBeenCalledWith(mockContext);
      expect(result).toBe(true);
    });
  });

  describe('handleRequest', () => {
    it('should return the user when no error and valid user provided', () => {
      const user = { id: 1, name: 'Test User' };
      const result = jwtAuthGuard.handleRequest(null, user, null, {} as ExecutionContext);
      expect(result).toEqual(user);
    });

    it('should throw InvalidTokenException when info message is "No auth token"', () => {
      expect(() => jwtAuthGuard.handleRequest(null, null, { message: 'No auth token' }, {} as ExecutionContext)).toThrow(
        new InvalidTokenException('Access Token is missing')
      );
    });

    it('should throw InvalidTokenException when info message is "jwt expired"', () => {
      expect(() => jwtAuthGuard.handleRequest(null, null, { message: 'jwt expired' }, {} as ExecutionContext)).toThrow(
        new InvalidTokenException('Access Token has expired')
      );
    });

    it('should throw InvalidTokenException when info message is "invalid token"', () => {
      expect(() => jwtAuthGuard.handleRequest(null, null, { message: 'invalid token' }, {} as ExecutionContext)).toThrow(
        new InvalidTokenException('Invalid Access token')
      );
    });

    it('should throw the provided error if error is present', () => {
      const error = new Error('Test error');
      expect(() => jwtAuthGuard.handleRequest(error, null, null, {} as ExecutionContext)).toThrow(error);
    });

    it('should throw InvalidTokenException when user is not provided', () => {
      expect(() => jwtAuthGuard.handleRequest(null, null, null, {} as ExecutionContext)).toThrow(
        new InvalidTokenException('Invalid Access token')
      );
    });
  });
});
