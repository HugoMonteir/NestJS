import { PassportStrategy } from '@nestjs/passport';
import { UserService } from '../../user/user.service';
import { UserDto } from '../../user/dto';
import { InvalidTokenException } from '../../../exceptions';
import { JwtPayload } from '../interfaces';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConfig } from '../../../configs';
import { Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

export class JwtStrategy extends PassportStrategy(Strategy) {
  public constructor(
    @Inject(jwtConfig.KEY)
    private config: ConfigType<typeof jwtConfig>,
    private userService: UserService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.secret
    });
  }

  public async validate(payload: JwtPayload): Promise<UserDto> {
    const { sub } = payload;
    const user = await this.userService.findOne(sub);

    if (!user) {
      throw new InvalidTokenException('Invalid Token');
    }

    return user;
  }
}
