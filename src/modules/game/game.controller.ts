import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, HttpCode, Put } from '@nestjs/common';
import { GameService } from './game.service';
import { CreateGameRequestDto, UpdateGameRequestDto, UpdatePartialGameRequestDto } from './dto';

@Controller('games')
export class GameController {
  public constructor(private readonly gameService: GameService) {}

  @Get()
  public async findAll() {
    return this.gameService.findAll();
  }

  @Get(':id')
  public async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.gameService.findOne(id);
  }

  @Post()
  public async create(@Body() createGameDto: CreateGameRequestDto) {
    return this.gameService.create(createGameDto);
  }

  @Put(':id')
  public async update(@Param('id', ParseIntPipe) id: number, @Body() updateGameDto: UpdateGameRequestDto) {
    return this.gameService.update(id, updateGameDto);
  }

  @Patch(':id')
  public async updatePartial(@Param('id', ParseIntPipe) id: number, @Body() updateGameDto: UpdatePartialGameRequestDto) {
    return this.gameService.update(id, updateGameDto);
  }

  @Delete(':id')
  @HttpCode(204)
  public async remove(@Param('id', ParseIntPipe) id: number) {
    return this.gameService.remove(id);
  }
}
