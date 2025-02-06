import { TokensInterface } from '../interfaces';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class TokensDto implements TokensInterface {
  @Expose()
  public readonly accessToken: string;

  @Expose()
  public readonly refreshToken: string;
}
