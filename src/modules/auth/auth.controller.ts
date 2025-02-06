import { Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthUser } from './decorator';
import { UserDto } from '../user/dto';
import { AuthResponseDto } from './dto';
import { LocalAuthGuard } from './guard';

@Controller('auth')
export class AuthController {
  public constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @HttpCode(200)
  public async login(@AuthUser() user: UserDto): Promise<AuthResponseDto> {
    return await this.authService.jwtSign(user);
  }
}
