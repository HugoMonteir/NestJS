import { Injectable } from '@nestjs/common';
import { CreateGameRequestDto, UpdateGameRequestDto, UpdatePartialGameRequestDto } from './dto';
import { Repository } from 'typeorm';
import { Game } from './entities';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { GameResponseDto } from './dto';
import { GameNotFoundException } from '../../exceptions';

@Injectable()
export class GameService {
  public constructor(@InjectRepository(Game) private repository: Repository<Game>) {}

  public async create(createGameDto: CreateGameRequestDto): Promise<GameResponseDto> {
    const game = this.repository.create(createGameDto);
    const savedGame = await this.repository.save(game);
    return plainToInstance(GameResponseDto, savedGame);
  }

  public async findAll(): Promise<GameResponseDto[]> {
    const games = await this.repository.find();
    return plainToInstance(GameResponseDto, games);
  }

  public async findOne(id: number): Promise<GameResponseDto> {
    const game = await this.repository.findOneBy({ id });

    if (!game) {
      throw new GameNotFoundException(`This game does not exist`);
    }

    return plainToInstance(GameResponseDto, game);
  }

  public async update(id: number, updateGameDto: UpdatePartialGameRequestDto | UpdateGameRequestDto): Promise<GameResponseDto> {
    const game = await this.repository.findOneBy({ id });

    if (!game) {
      throw new GameNotFoundException(`This game does not exist`);
    }

    const newGame: Game = {
      ...game,
      ...updateGameDto
    };

    const updatedGame = await this.repository.save(newGame);
    return plainToInstance(GameResponseDto, updatedGame);
  }

  public async remove(id: number): Promise<void> {
    const game = await this.repository.findOneBy({ id });

    if (!game) {
      throw new GameNotFoundException(`This game does not exist`);
    }

    await this.repository.remove(game);
  }
}
