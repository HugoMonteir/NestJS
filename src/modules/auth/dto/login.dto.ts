import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty({ message: 'Email is required' })
  public email: string;

  @IsNotEmpty({ message: 'Password is required' })
  public password: string;
}
