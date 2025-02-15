/*
import { LocalAuthGuard } from '../../../../src/common/guards';
import { ExecutionContext } from '@nestjs/common';
import { ValidationException } from '../../../../src/exceptions';

describe('LocalAuthGuard', () => {
  let localAuthGuard: LocalAuthGuard;

  beforeEach(() => {
    localAuthGuard = new LocalAuthGuard();
    // Spy no método da classe pai para simular o retorno quando a validação passar
    jest.spyOn(Object.getPrototypeOf(localAuthGuard), 'canActivate').mockResolvedValue(true);
  });

  const createMockContext = (body: any): ExecutionContext => {
    return {
      switchToHttp: () => ({
        getRequest: () => ({ body })
      }),
      getClass: () => null,
      getHandler: () => null,
      getArgs: () => [],
      getArgByIndex: () => null,
      switchToRpc: () => null,
      switchToWs: () => null,
      getType: () => 'http'
    } as any;
  };

  it('should return true when validation passes', async () => {
    const validBody = { email: 'user@example.com', password: 'ValidPassword123' };
    const context = createMockContext(validBody);
    const result = await localAuthGuard.canActivate(context);
    expect(result).toBe(true);
  });

  it('should throw ValidationException when validation fails', async () => {
    const invalidBody = { email: '', password: 'ValidPassword123' };
    const context = createMockContext(invalidBody);
    await expect(localAuthGuard.canActivate(context)).rejects.toThrow(ValidationException);
  });
});
*/
