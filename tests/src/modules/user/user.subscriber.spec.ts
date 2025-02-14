import { UserSubscriber } from '../../../../src/modules/user/user.subscriber';
import { User } from '../../../../src/modules/user/entities';
import { InsertEvent, UpdateEvent, EntityManager, Repository } from 'typeorm';
import { BadRequestException } from '@nestjs/common';
import { CryptUtil } from '../../../../src/common/utils/crypt.util';
import { user } from './user-data-mock.constants';

describe('UserSubscriber', () => {
  let userSubscriber: UserSubscriber;
  let userRepository: jest.Mocked<Repository<User>>;
  let userEntity: User;
  let manager: jest.Mocked<EntityManager>;
  let insertEvent: InsertEvent<User>;
  let updateEvent: UpdateEvent<User>;

  beforeEach(() => {
    userEntity = { ...user };

    userRepository = { findOneBy: jest.fn().mockResolvedValue(null) } as unknown as jest.Mocked<Repository<User>>;

    manager = {
      getRepository: jest.fn().mockReturnValue(userRepository)
    } as unknown as jest.Mocked<EntityManager>;

    insertEvent = { entity: userEntity, manager } as unknown as InsertEvent<User>;
    updateEvent = { entity: userEntity, manager } as unknown as UpdateEvent<User>;

    userSubscriber = new UserSubscriber();

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(userSubscriber).toBeDefined();
    expect(userRepository).toBeDefined();
    expect(userEntity).toBeDefined();
    expect(manager).toBeDefined();
    expect(insertEvent).toBeDefined();
    expect(updateEvent).toBeDefined();
  });

  describe('listenTo', () => {
    it('should return the User entity', () => {
      expect(userSubscriber.listenTo()).toBe(User);
    });
  });

  describe('beforeInsert', () => {
    it('should hash the password before insert', async () => {
      // Arrange
      const originalPassword = userEntity.password;
      jest.spyOn(CryptUtil, 'generateSalt').mockResolvedValue('randomSalt');
      jest.spyOn(CryptUtil, 'hashPassword').mockResolvedValue('hashedPassword');

      // Act
      await userSubscriber.beforeInsert(insertEvent);

      // Assert
      expect(CryptUtil.generateSalt).toHaveBeenCalledTimes(1);
      expect(CryptUtil.hashPassword).toHaveBeenCalledWith(originalPassword, 'randomSalt');
      expect(userEntity.password).toBe('hashedPassword');
      expect(userEntity.salt).toBe('randomSalt');
    });

    it('should throw BadRequestException when email is already in use', async () => {
      // Arrange
      manager.getRepository(User).findOneBy = jest.fn().mockResolvedValue({ ...userEntity, id: 2 });

      // Act & Assert
      await expect(userSubscriber.beforeInsert(insertEvent)).rejects.toThrow(
        new BadRequestException(`The email '${userEntity.email}' is already in use`)
      );
      expect(userRepository.findOneBy).toHaveBeenCalledTimes(1);
      expect(userRepository.findOneBy).toHaveBeenCalledWith({ email: userEntity.email });
    });

    it('should throw BadRequestException when username is already in use', async () => {
      // Arrange
      manager.getRepository(User).findOneBy = jest
        .fn()
        .mockResolvedValueOnce(null)
        .mockResolvedValueOnce({ ...userEntity, id: 2 });

      // Act & Assert
      await expect(userSubscriber.beforeInsert(insertEvent)).rejects.toThrow(
        new BadRequestException(`The username '${userEntity.username}' is already in use`)
      );
      expect(userRepository.findOneBy).toHaveBeenCalledTimes(2);
      expect(userRepository.findOneBy).toHaveBeenCalledWith({ email: userEntity.email });
      expect(userRepository.findOneBy).toHaveBeenCalledWith({ username: userEntity.username });
    });

    it('should not throw any exception when event.entity is undefined', async () => {
      // Arrange
      insertEvent.entity = undefined;

      // Act & Assert
      await expect(userSubscriber.beforeInsert(insertEvent)).resolves.not.toThrow();
    });
  });

  describe('beforeUpdate', () => {
    it('should not hash password if it has not changed', async () => {
      // Arrange
      manager.getRepository(User).findOneBy = jest.fn().mockResolvedValue(userEntity);

      // Act
      await userSubscriber.beforeUpdate(updateEvent);

      // Assert
      expect(CryptUtil.generateSalt).not.toHaveBeenCalled();
      expect(CryptUtil.hashPassword).not.toHaveBeenCalled();
    });

    it('should hash password if it has been changed', async () => {
      // Arrange
      const newPassword = 'newPassword123';
      userEntity.password = newPassword;

      jest.spyOn(CryptUtil, 'generateSalt').mockResolvedValue('newSalt');
      jest.spyOn(CryptUtil, 'hashPassword').mockResolvedValue('newHashedPassword');

      manager.getRepository(User).findOneBy = jest.fn().mockResolvedValue({ ...user });

      // Act
      await userSubscriber.beforeUpdate(updateEvent);

      // Assert
      expect(CryptUtil.generateSalt).toHaveBeenCalledTimes(1);
      expect(CryptUtil.hashPassword).toHaveBeenCalledWith(newPassword, 'newSalt');
      expect(userEntity.password).toBe('newHashedPassword');
      expect(userEntity.salt).toBe('newSalt');
    });

    it('should throw BadRequestException when updating to an existing email', async () => {
      // Arrange
      manager.getRepository(User).findOneBy = jest.fn().mockResolvedValue({ ...userEntity, id: 2 });

      // Act & Assert
      await expect(userSubscriber.beforeUpdate(updateEvent)).rejects.toThrow(
        new BadRequestException(`The email '${userEntity.email}' is already in use`)
      );
      expect(userRepository.findOneBy).toHaveBeenCalledTimes(1);
      expect(userRepository.findOneBy).toHaveBeenCalledWith({ email: userEntity.email });
    });

    it('should throw BadRequestException when updating to an existing username', async () => {
      // Arrange
      manager.getRepository(User).findOneBy = jest
        .fn()
        .mockResolvedValueOnce(null)
        .mockResolvedValueOnce({ ...userEntity, id: 2 });

      // Act & Assert
      await expect(userSubscriber.beforeUpdate(updateEvent)).rejects.toThrow(
        new BadRequestException(`The username '${userEntity.username}' is already in use`)
      );
      expect(userRepository.findOneBy).toHaveBeenCalledTimes(2);
      expect(userRepository.findOneBy).toHaveBeenCalledWith({ email: userEntity.email });
      expect(userRepository.findOneBy).toHaveBeenCalledWith({ username: userEntity.username });
    });

    it('should not throw any exception when event.entity is undefined', async () => {
      // Arrange
      updateEvent.entity = undefined;

      // Act & Assert
      await expect(userSubscriber.beforeUpdate(updateEvent)).resolves.not.toThrow();
    });
  });
});
