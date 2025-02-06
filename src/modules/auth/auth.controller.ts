import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthUser } from './decorator';
import { UserDto } from '../user/dto';
import { LocalAuthGuard } from './guard';
import { TokensDto } from './dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthRefreshDto } from './dto/auth-refresh.dto';

@Controller('auth')
export class AuthController {
  public constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @HttpCode(200)
  public async login(@AuthUser() user: UserDto): Promise<TokensDto> {
    return await this.authService.jwtSign(user);
  }

  @ApiBearerAuth()
  @Post('/refresh')
  @HttpCode(200)
  public async refresh(@Body() authRefreshDto: AuthRefreshDto): Promise<TokensDto> {
    return await this.authService.jwtRefresh(authRefreshDto);
  }
}
