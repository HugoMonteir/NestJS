import { PassportStrategy } from '@nestjs/passport';
import { UserService } from '../../modules/user/user.service';
import { UserResponseDto } from '../../modules/user/dto';
import { InvalidTokenException } from '../../exceptions';
import { JwtPayload } from '../../modules/auth/interfaces';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConfig } from '../../configs';
import { Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

export class JwtStrategy extends PassportStrategy(Strategy) {
  public constructor(
    @Inject(jwtConfig.KEY)
    config: ConfigType<typeof jwtConfig>,
    private userService: UserService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.secret
    });
  }

  public async validate(payload: JwtPayload): Promise<UserResponseDto> {
    const { sub, type } = payload;

    if (type !== 'access') {
      throw new InvalidTokenException('Invalid access Token');
    }

    const user = await this.userService.findOne(sub);

    if (!user) {
      throw new InvalidTokenException('Invalid access Token');
    }

    return user;
  }
}
