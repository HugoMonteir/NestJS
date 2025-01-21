import { CreateGameDto, GameDto, UpdateGameDto, UpdatePartialGameDto } from '../dto';

export interface GameServiceInterface {
  create(createGameDto: CreateGameDto): Promise<GameDto>;
  findAll(): Promise<GameDto[]>;
  findOne(id: number): Promise<GameDto>;
  update(id: number, updateGameDto: UpdatePartialGameDto | UpdateGameDto): Promise<GameDto>;
  remove(id: number): Promise<void>;
}
