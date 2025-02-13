import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthUser } from './decorator';
import { UserDto } from '../user/dto';
import { LocalAuthGuard } from './guard';
import { LoginDto, TokensDto } from './dto';
import { ApiOperation, ApiTags, ApiResponse, ApiBody } from '@nestjs/swagger';
import { AuthRefreshDto } from './dto/auth-refresh.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  public constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @ApiOperation({ summary: 'User login', description: 'Authenticates the user and returns an access and refresh token' })
  @ApiResponse({ status: 200, description: 'Successful login', type: TokensDto })
  @ApiResponse({ status: 401, description: 'Bad credentials' })
  @ApiBody({ description: 'Login user data', type: LoginDto })
  @HttpCode(200)
  public async login(@AuthUser() user: UserDto): Promise<TokensDto> {
    return await this.authService.jwtSign(user);
  }

  @Post('/refresh')
  @ApiOperation({
    operationId: 'auth_refresh',
    summary: 'Refresh access token',
    description: 'Uses a valid refresh token to generate a new access token'
  })
  @ApiResponse({ status: 200, description: 'Access token successfully refreshed', type: TokensDto })
  @ApiResponse({ status: 400, description: 'Invalid or expired refresh token' })
  @HttpCode(200)
  public async refresh(@Body() authRefreshDto: AuthRefreshDto): Promise<TokensDto> {
    return await this.authService.jwtRefresh(authRefreshDto);
  }
}
