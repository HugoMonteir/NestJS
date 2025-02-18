import { Game } from '../../../../src/modules/game/entities';
import { CreateGameDto, GameDto, UpdateGameDto, UpdatePartialGameDto } from '../../../../src/modules/game/dto';

export const gameMock: Game = {
  id: 1,
  name: 'The Legend of Zelda',
  description: 'An action-adventure game set in Hyrule',
  genre: 'Action-Adventure',
  platform: 'Nintendo Switch'
};

export const gameDtoMock: GameDto = { ...gameMock };

export const createGameDtoMock: CreateGameDto = {
  name: gameMock.name,
  description: gameMock.description,
  genre: gameMock.genre,
  platform: gameMock.platform
};

export const updateGameDtoMock: UpdateGameDto = {
  name: 'Zelda',
  description: gameMock.description,
  genre: gameMock.genre,
  platform: gameMock.platform
};

export const updatePartialGameDtoMock: UpdatePartialGameDto = {
  description: 'Zelda Game'
};
