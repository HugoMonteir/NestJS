import { ApiProperty, PickType } from '@nestjs/swagger';
import { TokensDto } from './tokens.dto';
import { IsNotEmpty } from 'class-validator';

export class AuthRefreshDto extends PickType(TokensDto, ['refreshToken']) {
  @ApiProperty({ description: 'Refresh token required to generate a new access token' })
  @IsNotEmpty({ message: 'Refresh token is required' })
  public refreshToken: string;
}
