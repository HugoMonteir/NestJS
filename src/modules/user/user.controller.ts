import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UserDto } from './dto';
import { JwtAuthGuard } from '../auth/guard';
import { AuthUser } from '../auth/decorator';

@Controller('users')
export class UserController {
  public constructor(private readonly userService: UserService) {}

  @Post()
  public async create(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
    return await this.userService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  public async getProfile(@AuthUser() user: UserDto): Promise<UserDto> {
    return user;
  }
}
