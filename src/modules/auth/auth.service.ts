import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from '../user/dto';
import { AuthResponseDto } from './dto';
import { JwtConfigService } from './jwt.config.service';

class JwtPayload {}

@Injectable()
export class AuthService {
  public constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private jwtConfigService: JwtConfigService
  ) {}

  public async validateUser(email: string, password: string): Promise<UserDto> {
    return await this.userService.validateUserByEmailAndPassword(email, password);
  }

  public async jwtSign(user: UserDto): Promise<AuthResponseDto> {
    const accessConfig = this.jwtConfigService.getAccessConfig();
    const refreshConfig = this.jwtConfigService.getRefreshConfig();

    const payload: JwtPayload = { sub: user.id };

    const accessToken = this.jwtService.sign(payload, accessConfig.signOptions);

    const refreshToken = this.jwtService.sign(payload, refreshConfig.signOptions);

    return new AuthResponseDto(accessToken, refreshToken);
  }
}
