import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { validate, ValidationError } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { LoginDto } from '../../modules/auth/dto';
import { ValidationErrorProperty } from '../interfaces';
import { ValidationException } from '../../exceptions';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    const { email, password } = request.body;

    const loginDto = plainToInstance(LoginDto, { email, password });

    const errors = await validate(loginDto);
    if (errors.length > 0) {
      const result: ValidationErrorProperty[] = errors.map((error: ValidationError) => ({
        field: error.property,
        message: error.constraints[Object.keys(error.constraints)[0]]
      }));

      throw new ValidationException(result);
    }

    return super.canActivate(context) as Promise<boolean>;
  }
}
