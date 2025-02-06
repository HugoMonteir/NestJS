import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '../auth.service';
import { UserDto } from '../../user/dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  public constructor(private authService: AuthService) {
    super({
      usernameField: 'email'
    });
  }

  public async validate(email: string, password: string): Promise<UserDto> {
    const user = await this.authService.validateUser(email, password);

    if (user.status != 'active') {
      throw new UnauthorizedException('User is not active');
    }

    return user;
  }
}
