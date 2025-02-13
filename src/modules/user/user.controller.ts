import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UserDto } from './dto';
import { JwtAuthGuard } from '../auth/guard';
import { AuthUser } from '../auth/decorator';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UserController {
  public constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user', description: 'Registers a new user in the system and returns the created user data' })
  @ApiResponse({ status: 201, description: 'User successfully created', type: UserDto })
  @ApiResponse({ status: 400, description: 'Validation failed' })
  public async create(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
    return await this.userService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Get user profile', description: 'Retrieves the authenticated user’s profile information' })
  @ApiResponse({ status: 200, description: 'User profile retrieved successfully', type: UserDto })
  @ApiResponse({ status: 401, description: 'Unauthorized - Invalid or missing token' })
  public async getProfile(@AuthUser() user: UserDto): Promise<UserDto> {
    return user;
  }
}
