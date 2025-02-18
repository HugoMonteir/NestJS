import { Test, TestingModule } from '@nestjs/testing';
import { GameController } from '../../../../src/modules/game/game.controller';
import { GameService } from '../../../../src/modules/game/game.service';
import { createGameDtoMock, gameDtoMock, updateGameDtoMock, updatePartialGameDtoMock } from './game-data-mock.constants';
import { CreateGameDto, GameDto, UpdateGameDto } from '../../../../src/modules/game/dto';

describe('GameController', () => {
  let gameController: GameController;
  let gameService: GameService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GameController],
      providers: [
        {
          provide: GameService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([gameDtoMock]),
            findOne: jest.fn().mockResolvedValue(gameDtoMock),
            create: jest.fn().mockResolvedValue(gameDtoMock),
            update: jest.fn().mockResolvedValue(gameDtoMock),
            remove: jest.fn().mockResolvedValue(undefined)
          }
        }
      ]
    }).compile();

    gameController = module.get<GameController>(GameController);
    gameService = module.get<GameService>(GameService);
  });

  it('should be defined', () => {
    // Assert
    expect(gameController).toBeDefined();
    expect(gameService).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of games', async () => {
      // Arrange
      const response: GameDto[] = [{ ...gameDtoMock }];

      // Act
      const result = await gameController.findAll();

      // Assert
      expect(result).toEqual(response);
      expect(gameService.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should return a game by id', async () => {
      // Arrange
      const id = gameDtoMock.id;
      const response: GameDto = { ...gameDtoMock };

      // Act
      const result = await gameController.findOne(id);

      // Assert
      expect(result).toEqual(response);
      expect(gameService.findOne).toHaveBeenCalledWith(id);
      expect(gameService.findOne).toHaveBeenCalledTimes(1);
    });
  });

  describe('create', () => {
    it('should create a new game', async () => {
      // Arrange
      const createDto: CreateGameDto = { ...createGameDtoMock };
      const response: GameDto = { ...gameDtoMock };

      // Act
      const result = await gameController.create(createGameDtoMock);

      // Assert
      expect(result).toEqual(response);
      expect(gameService.create).toHaveBeenCalledWith(createDto);
      expect(gameService.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('update', () => {
    it('should update an existing game', async () => {
      // Arrange
      const id = gameDtoMock.id;
      const updateDto: UpdateGameDto = { ...updateGameDtoMock };
      const response: GameDto = { ...gameDtoMock, ...updateDto };

      gameService.update = jest.fn().mockResolvedValueOnce(response);

      // Act
      const result = await gameController.update(id, updateDto);

      // Assert
      expect(result).toEqual(response);
      expect(gameService.update).toHaveBeenCalledWith(id, updateDto);
      expect(gameService.update).toHaveBeenCalledTimes(1);
    });
  });

  describe('updatePartial', () => {
    it('should partially update an existing game', async () => {
      // Arrange
      const id = gameDtoMock.id;
      const updateDto = { ...updatePartialGameDtoMock };
      const response: GameDto = { ...gameDtoMock, ...updateDto };

      gameService.update = jest.fn().mockResolvedValueOnce(response);

      // Act
      const result = await gameController.updatePartial(id, updateDto);

      // Assert
      expect(result).toEqual(response);
      expect(gameService.update).toHaveBeenCalledWith(id, updateDto);
      expect(gameService.update).toHaveBeenCalledTimes(1);
    });
  });

  describe('remove', () => {
    it('should remove a game', async () => {
      // Arrange
      const id = gameDtoMock.id;
      const response: GameDto = undefined;

      // Act
      const result = await gameController.remove(id);

      // Assert
      expect(result).toEqual(response);
      expect(gameService.remove).toHaveBeenCalledWith(id);
      expect(gameService.remove).toHaveBeenCalledTimes(1);
    });
  });
});
