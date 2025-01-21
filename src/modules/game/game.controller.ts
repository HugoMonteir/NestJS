import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, Put, Inject } from '@nestjs/common';
import { CreateGameRequestDto, GameDto, UpdateGameRequestDto, UpdatePartialGameRequestDto } from './dto';
import { GameServiceInterface } from './interfaces';
import { ParseIntIdPipe } from '../../common/pipes';

@Controller('games')
export class GameController {
  public constructor(@Inject('GameService') private readonly gameService: GameServiceInterface) {}

  @Get()
  public async findAll(): Promise<GameDto[]> {
    return this.gameService.findAll();
  }

  @Get(':id')
  public async findOne(@Param('id', ParseIntIdPipe) id: number): Promise<GameDto> {
    return this.gameService.findOne(id);
  }

  @Post()
  public async create(@Body() createGameDto: CreateGameRequestDto): Promise<GameDto> {
    return this.gameService.create(createGameDto);
  }

  @Put(':id')
  public async update(@Param('id', ParseIntIdPipe) id: number, @Body() updateGameDto: UpdateGameRequestDto): Promise<GameDto> {
    return this.gameService.update(id, updateGameDto);
  }

  @Patch(':id')
  public async updatePartial(
    @Param('id', ParseIntIdPipe) id: number,
    @Body() updateGameDto: UpdatePartialGameRequestDto
  ): Promise<GameDto> {
    return this.gameService.update(id, updateGameDto);
  }

  @Delete(':id')
  @HttpCode(204)
  public async remove(@Param('id', ParseIntIdPipe) id: number): Promise<void> {
    return this.gameService.remove(id);
  }
}
