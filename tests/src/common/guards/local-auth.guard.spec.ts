import { LocalAuthGuard } from '../../../../src/common/guards';
import { AuthGuard } from '@nestjs/passport';
import { validate } from 'class-validator';
import { ValidationException } from '../../../../src/exceptions';
import { ExecutionContext } from '@nestjs/common';

jest.mock('class-validator', () => ({ ...jest.requireActual('class-validator'), validate: jest.fn() }));

describe('LocalAuthGuard', () => {
  let localAuthGuard: LocalAuthGuard;

  const createMockContext = (body: Record<string, object | string>): ExecutionContext => {
    return {
      switchToHttp: () => ({
        getRequest: () => ({ body })
      })
    } as unknown as ExecutionContext;
  };

  beforeEach(() => {
    jest.clearAllMocks();
    localAuthGuard = new LocalAuthGuard();
    jest.spyOn(AuthGuard('local').prototype, 'canActivate').mockResolvedValue(true);
  });

  it('should return true when validation passes', async () => {
    // Arrange
    (validate as jest.Mock).mockResolvedValue([]);

    const mockBody = { email: 'user@example.com', password: 'ValidPassword123' };
    const context = createMockContext(mockBody);

    // Act
    const result = await localAuthGuard.canActivate(context);

    // Assert
    expect(validate).toHaveBeenCalledTimes(1);
    expect(AuthGuard('local').prototype.canActivate).toHaveBeenCalledWith(context);
    expect(result).toBe(true);
  });

  it('should throw ValidationException when validation fails', async () => {
    // Arrange
    (validate as jest.Mock).mockResolvedValue([
      {
        property: 'email',
        constraints: { isEmail: 'email must be an email' }
      }
    ]);

    const mockBody = { email: 'invalid-email', password: '123' };
    const context = createMockContext(mockBody);

    // Act & Assert
    await expect(localAuthGuard.canActivate(context)).rejects.toThrow(ValidationException);
    expect(validate).toHaveBeenCalledTimes(1);
    expect(AuthGuard('local').prototype.canActivate).not.toHaveBeenCalled();
  });
});
