import { Injectable } from '@nestjs/common';
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { UserResponseDto } from '../../modules/user/dto';
import { DisabledUserException } from '../../exceptions';
import { AuthService } from '../../modules/auth/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  public constructor(private authService: AuthService) {
    super({
      usernameField: 'email'
    });
  }

  public async validate(email: string, password: string): Promise<UserResponseDto> {
    const user = await this.authService.validateUser(email, password);

    if (user.status != 'active') {
      throw new DisabledUserException('User is not active');
    }

    return user;
  }
}
