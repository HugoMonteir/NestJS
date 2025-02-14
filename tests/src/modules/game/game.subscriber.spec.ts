import { GameSubscriber } from '../../../../src/modules/game/game.subscriber';
import { Game } from '../../../../src/modules/game/entities';
import { InsertEvent, UpdateEvent, EntityManager, Repository } from 'typeorm';
import { BadRequestException } from '@nestjs/common';
import { game } from './game-data-mock.constants';

describe('GameSubscriber', () => {
  let gameSubscriber: GameSubscriber;
  let gameRepository: jest.Mocked<Repository<Game>>;
  let gameEntity: Game;
  let manager: jest.Mocked<EntityManager>;
  let insertEvent: InsertEvent<Game>;
  let updateEvent: UpdateEvent<Game>;

  beforeEach(() => {
    gameEntity = { ...game };

    gameRepository = { findOneBy: jest.fn().mockResolvedValue(null) } as unknown as jest.Mocked<Repository<Game>>;

    manager = {
      getRepository: jest.fn().mockReturnValue(gameRepository)
    } as unknown as jest.Mocked<EntityManager>;

    insertEvent = { entity: gameEntity, manager } as unknown as InsertEvent<Game>;
    updateEvent = { entity: gameEntity, manager } as unknown as UpdateEvent<Game>;

    gameSubscriber = new GameSubscriber();

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(gameSubscriber).toBeDefined();
    expect(gameRepository).toBeDefined();
    expect(gameEntity).toBeDefined();
    expect(manager).toBeDefined();
    expect(insertEvent).toBeDefined();
    expect(updateEvent).toBeDefined();
  });

  describe('listenTo', () => {
    it('should return the Game entity', () => {
      expect(gameSubscriber.listenTo()).toBe(Game);
    });
  });

  describe('beforeInsert', () => {
    it('should not throw an exception when game name is unique', async () => {
      // Act & Assert
      await expect(gameSubscriber.beforeInsert(insertEvent)).resolves.not.toThrow();
      expect(gameRepository.findOneBy).toHaveBeenCalledWith({ name: gameEntity.name });
    });

    it('should throw BadRequestException when game name is already in use', async () => {
      // Arrange
      manager.getRepository(Game).findOneBy = jest.fn().mockResolvedValue({ ...gameEntity, id: 2 });

      // Act & Assert
      await expect(gameSubscriber.beforeInsert(insertEvent)).rejects.toThrow(
        new BadRequestException(`The name '${gameEntity.name}' is already in use`)
      );
      expect(gameRepository.findOneBy).toHaveBeenCalledWith({ name: gameEntity.name });
    });

    it('should not throw any exception when event.entity is undefined', async () => {
      // Arrange
      insertEvent.entity = undefined;

      // Act & Assert
      await expect(gameSubscriber.beforeInsert(insertEvent)).resolves.not.toThrow();
    });
  });

  describe('beforeUpdate', () => {
    it('should not throw an exception when game name is unique', async () => {
      // Act & Assert
      await expect(gameSubscriber.beforeUpdate(updateEvent)).resolves.not.toThrow();
      expect(gameRepository.findOneBy).toHaveBeenCalledWith({ name: gameEntity.name });
    });

    it('should throw BadRequestException when updating to an existing game name', async () => {
      // Arrange
      manager.getRepository(Game).findOneBy = jest.fn().mockResolvedValue({ ...gameEntity, id: 2 });

      // Act & Assert
      await expect(gameSubscriber.beforeUpdate(updateEvent)).rejects.toThrow(
        new BadRequestException(`The name '${gameEntity.name}' is already in use`)
      );
      expect(gameRepository.findOneBy).toHaveBeenCalledWith({ name: gameEntity.name });
    });

    it('should not throw any exception when event.entity is undefined', async () => {
      // Arrange
      updateEvent.entity = undefined;

      // Act & Assert
      await expect(gameSubscriber.beforeUpdate(updateEvent)).resolves.not.toThrow();
    });
  });
});
