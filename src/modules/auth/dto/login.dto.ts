import { IsEmail, IsNotEmpty, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'user@example.com', description: 'User email for authentication' })
  @MaxLength(255, { message: 'The email must not exceed 255 characters' })
  @IsEmail({}, { message: 'The email is bad formatted' })
  @IsNotEmpty({ message: 'The email field is required' })
  public email: string;

  @ApiProperty({ example: 'mySecurePassword123', description: 'User password for authentication' })
  @MaxLength(255, { message: 'The password must not exceed 255 characters' })
  @IsNotEmpty({ message: 'The password field is required' })
  public password: string;
}
