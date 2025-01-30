import { PickType } from '@nestjs/swagger';
import { UserDto } from './user.dto';
import { IsEmail, IsNotEmpty, IsStrongPassword, MaxLength } from 'class-validator';

export class CreateUserDto extends PickType(UserDto, ['username', 'email', 'password', 'status', 'role']) {
  @MaxLength(50, { message: 'The username must not exceed 50 characters.' })
  @IsNotEmpty({ message: 'The username field is required.' })
  public username: string;

  @MaxLength(255, { message: 'The email must not exceed 255 characters.' })
  @IsEmail({}, { message: 'The email is bad formatted.' })
  @IsNotEmpty({ message: 'The email field is required.' })
  public email: string;

  @MaxLength(255, { message: 'The password must not exceed 255 characters.' })
  @IsStrongPassword({}, { message: 'The password is not strong enough.' })
  @IsNotEmpty({ message: 'The password field is required.' })
  public password: string;

  @MaxLength(30, { message: 'The status must not exceed 30 characters.' })
  @IsNotEmpty({ message: 'The status field is required.' })
  public status: string;

  @MaxLength(30, { message: 'The role must not exceed 30 characters.' })
  @IsNotEmpty({ message: 'The role field is required.' })
  public role: string;
}
