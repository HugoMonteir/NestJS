import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, Put, Inject } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { CreateGameDto, GameDto, UpdateGameDto, UpdatePartialGameDto } from './dto';
import { GameServiceInterface } from './interfaces';
import { ParseIntIdPipe } from '../../common/pipes';

@ApiTags('Games')
@Controller('games')
export class GameController {
  public constructor(@Inject('GameService') private readonly gameService: GameServiceInterface) {}

  @ApiOperation({ summary: 'Return all games' })
  @ApiResponse({ status: 200, description: 'List of games returned successfully', type: [GameDto] })
  @Get()
  public async findAll(): Promise<GameDto[]> {
    return this.gameService.findAll();
  }

  @ApiOperation({ summary: 'Return a specific game by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'The unique identifier of the game' })
  @ApiResponse({ status: 200, description: 'Game returned successfully', type: GameDto })
  @ApiResponse({ status: 400, description: 'Invalid ID format' })
  @Get(':id')
  public async findOne(@Param('id', ParseIntIdPipe) id: number): Promise<GameDto> {
    return this.gameService.findOne(id);
  }

  @ApiOperation({ summary: 'Create a new game' })
  @ApiBody({ type: CreateGameDto })
  @ApiResponse({ status: 201, description: 'Game created successfully', type: GameDto })
  @Post()
  public async create(@Body() createGameDto: CreateGameDto): Promise<GameDto> {
    return this.gameService.create(createGameDto);
  }

  @ApiOperation({ summary: 'Update an existing game by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'The unique identifier of the game' })
  @ApiBody({ type: UpdateGameDto })
  @ApiResponse({ status: 200, description: 'Game updated successfully', type: GameDto })
  @ApiResponse({ status: 400, description: 'Invalid ID format' })
  @Put(':id')
  public async update(@Param('id', ParseIntIdPipe) id: number, @Body() updateGameDto: UpdateGameDto): Promise<GameDto> {
    return this.gameService.update(id, updateGameDto);
  }

  @ApiOperation({ summary: 'Partially update an existing game by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'The unique identifier of the game' })
  @ApiBody({ type: UpdatePartialGameDto })
  @ApiResponse({ status: 200, description: 'Game partially updated successfully', type: GameDto })
  @ApiResponse({ status: 400, description: 'Invalid ID format' })
  @Patch(':id')
  public async updatePartial(@Param('id', ParseIntIdPipe) id: number, @Body() updateGameDto: UpdatePartialGameDto): Promise<GameDto> {
    return this.gameService.update(id, updateGameDto);
  }

  @ApiOperation({ summary: 'Delete a game by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'The unique identifier of the game' })
  @ApiResponse({ status: 204, description: 'Game deleted successfully' })
  @ApiResponse({ status: 400, description: 'Invalid ID format' })
  @HttpCode(204)
  @Delete(':id')
  public async remove(@Param('id', ParseIntIdPipe) id: number): Promise<void> {
    return this.gameService.remove(id);
  }
}
