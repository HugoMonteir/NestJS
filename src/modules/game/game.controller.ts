import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, HttpCode, Put } from '@nestjs/common';
import { GameService } from './game.service';
import { CreateGameRequestDto, GameDto, UpdateGameRequestDto, UpdatePartialGameRequestDto } from './dto';

@Controller('games')
export class GameController {
  public constructor(private readonly gameService: GameService) {}

  @Get()
  public async findAll(): Promise<GameDto[]> {
    return this.gameService.findAll();
  }

  @Get(':id')
  public async findOne(@Param('id', ParseIntPipe) id: number): Promise<GameDto> {
    return this.gameService.findOne(id);
  }

  @Post()
  public async create(@Body() createGameDto: CreateGameRequestDto): Promise<GameDto> {
    return this.gameService.create(createGameDto);
  }

  @Put(':id')
  public async update(@Param('id', ParseIntPipe) id: number, @Body() updateGameDto: UpdateGameRequestDto): Promise<GameDto> {
    return this.gameService.update(id, updateGameDto);
  }

  @Patch(':id')
  public async updatePartial(@Param('id', ParseIntPipe) id: number, @Body() updateGameDto: UpdatePartialGameRequestDto): Promise<GameDto> {
    return this.gameService.update(id, updateGameDto);
  }

  @Delete(':id')
  @HttpCode(204)
  public async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.gameService.remove(id);
  }
}
