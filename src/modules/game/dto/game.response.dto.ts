import { GameInterface } from '../interfaces';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class GameResponseDto implements GameInterface {
  @Expose()
  public id: number;

  @Expose()
  public name: string;

  @Expose()
  public description?: string;

  @Expose()
  public genre: string;

  @Expose()
  public platform: string;
}
