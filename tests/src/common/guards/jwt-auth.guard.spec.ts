/*
import { JwtAuthGuard } from '../../../../src/common/guards';
import { InvalidTokenException } from '../../../../src/exceptions';

describe('JwtAuthGuard', () => {
  let jwtAuthGuard: JwtAuthGuard;

  beforeEach(() => {
    jwtAuthGuard = new JwtAuthGuard();
  });

  describe('handleRequest', () => {
    it('should return the user when no error and valid user provided', () => {
      const user = { id: 1, name: 'Test User' };
      const result = jwtAuthGuard.handleRequest(null, user, null, {} as any);
      expect(result).toEqual(user);
    });

    it('should throw InvalidTokenException when info message is "No auth token"', () => {
      expect(() => jwtAuthGuard.handleRequest(null, null, { message: 'No auth token' }, {} as any)).toThrow(
        new InvalidTokenException('Access Token is missing')
      );
    });

    it('should throw InvalidTokenException when info message is "jwt expired"', () => {
      expect(() => jwtAuthGuard.handleRequest(null, null, { message: 'jwt expired' }, {} as any)).toThrow(
        new InvalidTokenException('Access Token has expired')
      );
    });

    it('should throw InvalidTokenException when info message is "invalid token"', () => {
      expect(() => jwtAuthGuard.handleRequest(null, null, { message: 'invalid token' }, {} as any)).toThrow(
        new InvalidTokenException('Invalid Access token')
      );
    });

    it('should throw the provided error if error is present', () => {
      const error = new Error('Test error');
      expect(() => jwtAuthGuard.handleRequest(error, null, null, {} as any)).toThrow(error);
    });

    it('should throw InvalidTokenException when user is not provided', () => {
      expect(() =>
        jwtAuthGuard.handleRequest(null, null, null, {} as any)
      ).toThrow(new InvalidTokenException('Invalid Access token'));
    });
  });
});
*/
