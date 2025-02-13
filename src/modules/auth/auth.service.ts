import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from '../user/dto';
import { TokensDto } from './dto';
import { plainToInstance } from 'class-transformer';
import { AuthRefreshDto } from './dto/auth-refresh.dto';
import { JwtPayload } from './interfaces';
import { InvalidTokenException } from '../../exceptions';
import { JwtConfigService } from './jwt.config.service';

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

    const accessToken = this.jwtService.sign({ sub: user.id, type: 'access' } as JwtPayload, accessConfig.signOptions);
    const refreshToken = this.jwtService.sign({ sub: user.id, type: 'refresh' } as JwtPayload, refreshConfig.signOptions);

    return plainToInstance(TokensDto, { accessToken, refreshToken });
  }

  public async jwtRefresh(authRefreshDto: AuthRefreshDto): Promise<TokensDto> {
    const refreshConfig = this.jwtConfigService.getRefreshConfig();
    let verified: JwtPayload;

    try {
      verified = await this.jwtService.verifyAsync<JwtPayload>(authRefreshDto.refreshToken, refreshConfig.verifyOptions);
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        throw new InvalidTokenException('Refresh token has expired');
      }

      if (error.name === 'JsonWebTokenError') {
        throw new InvalidTokenException('Invalid refresh token signature');
      }

      throw new InvalidTokenException('Invalid refresh token');
    }

    if (!verified || verified.type !== 'refresh') {
      throw new InvalidTokenException('Invalid refresh token');
    }

    const user = await this.userService.findOne(verified.sub);

    if (!user) {
      throw new InvalidTokenException('User not found for this refresh token');
    }

    return this.jwtSign(user);
  }
}
