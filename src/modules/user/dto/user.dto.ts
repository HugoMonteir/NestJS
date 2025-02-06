import { UserInterface } from '../interfaces';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class UserDto implements UserInterface {
  @Expose()
  public id: number;

  @Expose()
  public username: string;

  @Expose()
  public email: string;

  @Expose()
  public salt: string;

  public password: string;

  @Expose()
  public status: string;

  @Expose()
  public role: string;
}
