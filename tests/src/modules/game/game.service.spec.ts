import { Test, TestingModule } from '@nestjs/testing';
import { GameService } from '../../../../src/modules/game/game.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Game } from '../../../../src/modules/game/entities';
import { CreateGameDto, GameDto, UpdateGameDto, UpdatePartialGameDto } from '../../../../src/modules/game/dto';
import { gameMock, gameDtoMock, createGameDtoMock, updateGameDtoMock, updatePartialGameDtoMock } from './game-data-mock.constants';
import { GameNotFoundException } from '../../../../src/exceptions';
import { Repository } from 'typeorm';

describe('GameService', () => {
  let gameService: GameService;
  let gameRepository: Repository<Game>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GameService,
        {
          provide: getRepositoryToken(Game),
          useValue: {
            find: jest.fn().mockResolvedValue([gameMock]),
            findOneBy: jest.fn().mockResolvedValue(gameMock),
            create: jest.fn().mockReturnValue(gameMock),
            save: jest.fn().mockResolvedValue(gameMock),
            remove: jest.fn().mockResolvedValue(undefined)
          }
        }
      ]
    }).compile();

    gameService = module.get<GameService>(GameService);
    gameRepository = module.get(getRepositoryToken(Game));
  });

  it('should be defined', () => {
    expect(gameService).toBeDefined();
    expect(gameRepository).toBeDefined();
  });

  describe('create', () => {
    it('should create a new game', async () => {
      // Arrange
      const body: CreateGameDto = { ...createGameDtoMock };
      const response: GameDto = { ...gameDtoMock };

      // Act
      const result = await gameService.create(body);

      // Assert
      expect(result).toEqual(response);
      expect(gameRepository.create).toHaveBeenCalledWith(body);
      expect(gameRepository.save).toHaveBeenCalledWith(gameMock);
    });
  });

  describe('findAll', () => {
    it('should return an array of games', async () => {
      // Arrange
      const response: GameDto[] = [{ ...gameDtoMock }];

      // Act
      const result = await gameService.findAll();

      // Assert
      expect(result).toEqual(response);
      expect(gameRepository.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should return a game by id', async () => {
      // Arrange
      const id = gameDtoMock.id;
      const response: GameDto = { ...gameDtoMock };

      // Act
      const result = await gameService.findOne(id);

      // Assert
      expect(result).toEqual(response);
      expect(gameRepository.findOneBy).toHaveBeenCalledWith({ id });
      expect(gameRepository.findOneBy).toHaveBeenCalledTimes(1);
    });

    it('should throw an error if game does not exist', async () => {
      // Arrange
      const id = -1;
      jest.spyOn(gameRepository, 'findOneBy').mockResolvedValueOnce(null);

      // Act & Assert
      await expect(gameService.findOne(id)).rejects.toThrow(new GameNotFoundException(`This game does not exist`));
      expect(gameRepository.findOneBy).toHaveBeenCalledWith({ id });
      expect(gameRepository.findOneBy).toHaveBeenCalledTimes(1);
    });
  });

  describe('update', () => {
    it('should update an existing game with complete update DTO', async () => {
      // Arrange
      const updateDto: UpdateGameDto = { ...updateGameDtoMock };
      const updatedGame = { ...gameMock, ...updateDto };
      jest.spyOn(gameRepository, 'findOneBy').mockResolvedValueOnce(gameMock);
      jest.spyOn(gameRepository, 'save').mockResolvedValueOnce(updatedGame);

      // Act
      const result = await gameService.update(1, updateDto);

      // Assert
      expect(result).toEqual(updatedGame);
      expect(gameRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
      expect(gameRepository.save).toHaveBeenCalledWith(updatedGame);
    });

    it('should partially update an existing game', async () => {
      // Arrange
      const updatePDto: UpdatePartialGameDto = { ...updatePartialGameDtoMock };
      const updatedGame = { ...gameMock, ...updatePDto };
      jest.spyOn(gameRepository, 'findOneBy').mockResolvedValueOnce(gameMock);
      jest.spyOn(gameRepository, 'save').mockResolvedValueOnce(updatedGame);

      // Act
      const result = await gameService.update(1, updatePDto);

      // Assert
      expect(result).toEqual(updatedGame);
      expect(gameRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
      expect(gameRepository.save).toHaveBeenCalledWith(updatedGame);
    });

    it('should throw an error if game does not exist on update', async () => {
      // Arrange
      const id = -1;
      jest.spyOn(gameRepository, 'findOneBy').mockResolvedValueOnce(null);

      // Act & Assert
      await expect(gameService.update(id, {})).rejects.toThrow(new GameNotFoundException(`This game does not exist`));
      expect(gameRepository.findOneBy).toHaveBeenCalledWith({ id });
      expect(gameRepository.findOneBy).toHaveBeenCalledTimes(1);
    });
  });

  /*describe('remove', () => {
    it('should remove a game', async () => {
      // Arrange
      const id = 1;
      const response: GameDto = undefined;
      jest.spyOn(gameRepository, 'findOneBy').mockResolvedValueOnce(gameMock);

      // Act
      const result = await gameService.remove(id);

      // Assert
      expect(result).toEqual(response);
      expect(gameRepository.remove).toHaveBeenCalledWith(gameMock);
    });

    it('should throw an error if game does not exist on remove', async () => {
      // Arrange
      const id = -1;
      jest.spyOn(gameRepository, 'findOneBy').mockResolvedValueOnce(null);

      // Act & Assert
      await expect(gameService.remove(id)).rejects.toThrow(new GameNotFoundException(`This game does not exist`));
      expect(gameRepository.findOneBy).toHaveBeenCalledWith({ id });
      expect(gameRepository.findOneBy).toHaveBeenCalledTimes(1);
    });
  });*/
});
