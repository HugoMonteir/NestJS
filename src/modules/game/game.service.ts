import { Injectable } from '@nestjs/common';
import { CreateGameRequestDto, UpdateGameRequestDto, UpdatePartialGameRequestDto } from './dto';
import { Repository } from 'typeorm';
import { Game } from './entities';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { GameDto } from './dto';
import { GameNotFoundException } from '../../exceptions';

@Injectable()
export class GameService {
  public constructor(@InjectRepository(Game) private repository: Repository<Game>) {}

  public async create(createGameDto: CreateGameRequestDto): Promise<GameDto> {
    const game = this.repository.create(createGameDto);
    const savedGame = await this.repository.save(game);
    return plainToInstance(GameDto, savedGame);
  }

  public async findAll(): Promise<GameDto[]> {
    const games = await this.repository.find();
    return plainToInstance(GameDto, games);
  }

  public async findOne(id: number): Promise<GameDto> {
    const game = await this.repository.findOneBy({ id });

    if (!game) {
      throw new GameNotFoundException(`This game does not exist`);
    }

    return plainToInstance(GameDto, game);
  }

  public async update(id: number, updateGameDto: UpdatePartialGameRequestDto | UpdateGameRequestDto): Promise<GameDto> {
    const game = await this.repository.findOneBy({ id });

    if (!game) {
      throw new GameNotFoundException(`This game does not exist`);
    }

    const newGame: Game = {
      ...game,
      ...updateGameDto
    };

    const updatedGame = await this.repository.save(newGame);
    return plainToInstance(GameDto, updatedGame);
  }

  public async remove(id: number): Promise<void> {
    const game = await this.repository.findOneBy({ id });

    if (!game) {
      throw new GameNotFoundException(`This game does not exist`);
    }

    await this.repository.remove(game);
  }
}
