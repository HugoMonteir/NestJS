import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { InvalidTokenException } from '../../exceptions';
import { UserInterface } from '../../modules/user/interfaces';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  public async canActivate(context: ExecutionContext): Promise<boolean> {
    return (await super.canActivate(context)) as boolean;
  }

  public handleRequest<TUser = UserInterface>(
    err: Error | null,
    user: TUser,
    info: { message?: string } | string | null,
    _: ExecutionContext
  ): TUser {
    if (info && typeof info === 'object' && info.message === 'No auth token') {
      throw new InvalidTokenException('Access Token is missing');
    }

    if (info && typeof info === 'object' && info.message === 'jwt expired') {
      throw new InvalidTokenException('Access Token has expired');
    }

    if (info && typeof info === 'object' && info.message === 'invalid token') {
      throw new InvalidTokenException('Invalid Access token');
    }

    if (err || !user) {
      throw err || new InvalidTokenException('Invalid Access token');
    }

    return user;
  }
}
