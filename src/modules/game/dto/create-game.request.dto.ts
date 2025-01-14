import { IsNotEmpty, IsOptional, MaxLength } from 'class-validator';

export class CreateGameRequestDto {
  @MaxLength(100, { message: 'The name must not exceed 100 characters.' })
  @IsNotEmpty({ message: 'The name field is required.' })
  public name: string;

  @IsOptional()
  public description?: string;

  @MaxLength(30, { message: 'The genre must not exceed 30 characters.' })
  @IsNotEmpty({ message: 'The genre field is required.' })
  public genre: string;

  @MaxLength(20, { message: 'The platform must not exceed 20 characters.' })
  @IsNotEmpty({ message: 'The platform field is required.' })
  public platform: string;
}
