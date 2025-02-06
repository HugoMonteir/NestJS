import { PickType } from '@nestjs/swagger';
import { TokensDto } from './tokens.dto';
import { IsNotEmpty } from 'class-validator';

export class AuthRefreshDto extends PickType(TokensDto, ['refreshToken']) {
  @IsNotEmpty({ message: 'Refresh token is required' })
  public refreshToken: string;
}
