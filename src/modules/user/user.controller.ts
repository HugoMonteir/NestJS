import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UserDto } from './dto';
import { ParseIntIdPipe } from '../../common/pipes';

@Controller('users')
export class UserController {
  public constructor(private readonly userService: UserService) {}

  @Post()
  public async create(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
    return await this.userService.create(createUserDto);
  }

  @Get(':id')
  public async findOne(@Param('id', ParseIntIdPipe) id: number): Promise<UserDto> {
    return this.userService.findOne(id);
  }
}
