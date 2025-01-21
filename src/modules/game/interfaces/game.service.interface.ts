import { CreateGameRequestDto, GameDto, UpdateGameRequestDto, UpdatePartialGameRequestDto } from '../dto';

export interface GameServiceInterface {
  create(createGameDto: CreateGameRequestDto): Promise<GameDto>;
  findAll(): Promise<GameDto[]>;
  findOne(id: number): Promise<GameDto>;
  update(id: number, updateGameDto: UpdatePartialGameRequestDto | UpdateGameRequestDto): Promise<GameDto>;
  remove(id: number): Promise<void>;
}
