import { ApiProperty } from '@nestjs/swagger';
import { UserInterface } from '../interfaces';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class UserDto implements UserInterface {
  @ApiProperty({ description: 'Unique username of the user', maxLength: 50, example: 'john_doe' })
  @Expose()
  public id: number;

  @ApiProperty({ description: 'Valid email address of the user', maxLength: 255, example: 'john.doe@example.com' })
  @Expose()
  public username: string;

  @ApiProperty({ description: 'Strong password for user authentication', maxLength: 255, example: 'StrongPass!2023' })
  @Expose()
  public email: string;

  public salt: string;

  public password: string;

  @ApiProperty({ description: 'Status of the user (e.g., active, inactive)', maxLength: 30, example: 'active' })
  @Expose()
  public status: string;

  @ApiProperty({ description: 'Role of the user (admin, user)', maxLength: 30, example: 'user' })
  @Expose()
  public role: string;
}
