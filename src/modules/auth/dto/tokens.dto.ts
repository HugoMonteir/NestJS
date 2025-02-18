import { TokensInterface } from '../interfaces';
import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class TokensDto implements TokensInterface {
  @ApiProperty({
    description: 'JWT access token used for authenticated requests',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInR5cGUiOiJhY2Nlc3MiLCJpYXQiOjE2NzM2MjU3NjIsImV4cCI6MTY3MzYyOTM2Mn0.L6T7bqXUdPxuN6_jnN1RY8g2BvFu2flqWED1jJS8h3E'
  })
  @Expose()
  public readonly accessToken: string;

  @ApiProperty({
    description: 'JWT refresh token used to generate a new access token',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInR5cGUiOiJyZWZyZXNoIiwiaWF0IjoxNjczNjI1NzYyLCJleHAiOjE2NzQyMzA1NjJ9.t7pClxUo5yzgZhUQwnJv7Ozk1FujWJ1lLgVwOoqCk2E'
  })
  @Expose()
  public readonly refreshToken: string;
}
