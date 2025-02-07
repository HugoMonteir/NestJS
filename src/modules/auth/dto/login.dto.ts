import { IsEmail, IsNotEmpty, MaxLength } from 'class-validator';

export class LoginDto {
  @MaxLength(255, { message: 'The email must not exceed 255 characters.' })
  @IsEmail({}, { message: 'The email is bad formatted.' })
  @IsNotEmpty({ message: 'The email field is required.' })
  public email: string;

  @MaxLength(255, { message: 'The password must not exceed 255 characters.' })
  @IsNotEmpty({ message: 'The password field is required.' })
  public password: string;
}
