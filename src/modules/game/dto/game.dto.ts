import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class GameDto {
  @ApiProperty({
    description: 'The unique identifier of the game',
    example: 1
  })
  @Expose()
  public id: number;

  @ApiProperty({
    description: 'The name of the game',
    example: 'Legend of Zelda'
  })
  @Expose()
  public name: string;

  @ApiProperty({
    description: 'A short description of the game',
    example: 'An action-adventure game set in the kingdom of Hyrule.'
  })
  @Expose()
  public description?: string;

  @ApiProperty({
    description: 'The genre of the game',
    example: 'Action-Adventure'
  })
  @Expose()
  public genre: string;

  @ApiProperty({
    description: 'The platform where the game is available',
    example: 'Nintendo Switch'
  })
  @Expose()
  public platform: string;
}
