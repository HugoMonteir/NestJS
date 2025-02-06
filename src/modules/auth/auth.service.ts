import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from '../user/dto';
import { TokensDto } from './dto';
import { JwtConfigService } from './jwt.config.service';
import { plainToInstance } from 'class-transformer';
import { AuthRefreshDto } from './dto/auth-refresh.dto';
import { JwtPayload } from './interfaces';
import { InvalidTokenException } from '../../exceptions';

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

  public async jwtSign(user: UserDto): Promise<TokensDto> {
    const accessConfig = this.jwtConfigService.getAccessConfig();
    const refreshConfig = this.jwtConfigService.getRefreshConfig();

    const payload: JwtPayload = { sub: user.id };

    const accessToken = this.jwtService.sign(payload, accessConfig.signOptions);

    const refreshToken = this.jwtService.sign(payload, refreshConfig.signOptions);

    return plainToInstance(TokensDto, { accessToken, refreshToken });
  }

  public async jwtRefresh(authRefreshDto: AuthRefreshDto): Promise<TokensDto> {
    const refreshConfig = this.jwtConfigService.getRefreshConfig();

    const verified = await this.jwtService.verifyAsync<JwtPayload>(authRefreshDto.refreshToken, refreshConfig.verifyOptions);

    if (!verified) {
      throw new InvalidTokenException('Invalid token');
    }

    const id = verified.sub;
    const user = await this.userService.findOne(id);
    return this.jwtSign(user);
  }
}
