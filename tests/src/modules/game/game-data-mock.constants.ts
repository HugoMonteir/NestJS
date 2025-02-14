import { Game } from '../../../../src/modules/game/entities';
import { CreateGameDto, GameDto, UpdateGameDto, UpdatePartialGameDto } from '../../../../src/modules/game/dto';

export const game: Game = {
  id: 1,
  name: 'The Legend of Zelda',
  description: 'An action-adventure game set in Hyrule',
  genre: 'Action-Adventure',
  platform: 'Nintendo Switch'
};

export const gameDto: GameDto = { ...game };

export const createGameDto: CreateGameDto = {
  name: game.name,
  description: game.description,
  genre: game.genre,
  platform: game.platform
};

export const updateGameDto: UpdateGameDto = {
  name: 'Zelda',
  description: game.description,
  genre: game.genre,
  platform: game.platform
};

export const updatePartialGameDto: UpdatePartialGameDto = {
  description: 'Zelda Game'
};
