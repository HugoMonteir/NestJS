import { ForbiddenException, NotFoundException, UnauthorizedException } from '@nestjs/common';

export const SERVER_CONFIG = 'SERVER_CONFIG';
export const TYPEORM_CONFIG = 'TYPEORM_CONFIG';
export const JWT_MODULE_CONFIG = 'JWT_MODULE_CONFIG';

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export const EXCEPTION_MESSAGES: Map<Function, string | object> = new Map([
  [NotFoundException, 'The requested resource was not found'],
  [UnauthorizedException, 'You are not authorized to access this resource'],
  [ForbiddenException, 'You do not have permission to access this resource']
]);
