import { ApiProperty } from '@nestjs/swagger';
import { UserInterface } from '../interfaces';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class UserDto implements UserInterface {
  @ApiProperty({ description: 'Unique identifier of the user', example: 1 })
  @Expose()
  public id: number;

  @ApiProperty({ description: 'Unique username chosen by the user', maxLength: 50, example: 'john_doe' })
  @Expose()
  public username: string;

  @ApiProperty({
    description: 'Email address of the user, used for authentication and communication',
    maxLength: 255,
    example: 'john.doe@example.com'
  })
  @Expose()
  public email: string;

  public salt: string;

  public password: string;

  @ApiProperty({ description: 'Status of the user (active, inactive)', maxLength: 30, example: 'active' })
  @Expose()
  public status: string;

  @ApiProperty({ description: 'Role of the user (admin, user)', maxLength: 30, example: 'user' })
  @Expose()
  public role: string;
}
