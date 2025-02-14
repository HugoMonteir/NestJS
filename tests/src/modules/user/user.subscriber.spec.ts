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
    jest.clearAllMocks();
    updateEvent = { entity: userEntity, manager } as unknown as UpdateEvent<User>;

    userSubscriber = new UserSubscriber();
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
      const originalPassword = userEntity.password;

      jest.spyOn(CryptUtil, 'generateSalt').mockResolvedValue('randomSalt');
      jest.spyOn(CryptUtil, 'hashPassword').mockResolvedValue('hashedPassword');

      await userSubscriber.beforeInsert(insertEvent);

      expect(CryptUtil.generateSalt).toHaveBeenCalledTimes(1);
      expect(CryptUtil.hashPassword).toHaveBeenCalledWith(originalPassword, 'randomSalt');
      expect(userEntity.password).toBe('hashedPassword');
      expect(userEntity.salt).toBe('randomSalt');
    });

    it('should throw BadRequestException when email is already in use', async () => {
      // Arrange
      userRepository.findOneBy.mockResolvedValueOnce(userEntity);

      // Act & Assert
      await expect(userSubscriber.beforeInsert(insertEvent)).rejects.toThrow(
        new BadRequestException(`The email '${userEntity.email}' is already in use`)
      );

      expect(userRepository.findOneBy).toHaveBeenCalledTimes(1);
      expect(userRepository.findOneBy).toHaveBeenCalledWith({ email: userEntity.email });
    });

    it('should throw BadRequestException when username is already in use', async () => {
      manager.getRepository(User).findOneBy = jest
        .fn()
        .mockResolvedValueOnce(null) // Email check passes
        .mockResolvedValueOnce(userEntity); // Username check fails

      await expect(userSubscriber.beforeInsert(insertEvent)).rejects.toThrow(
        new BadRequestException(`The username '${userEntity.username}' is already in use`)
      );
    });
  });

  describe('beforeUpdate', () => {
    it('should not throw any exception when all validations pass', async () => {
      await expect(userSubscriber.beforeUpdate(updateEvent)).resolves.not.toThrow();
    });

    it('should throw BadRequestException when updating to an existing email', async () => {
      manager.getRepository(User).findOneBy = jest.fn().mockResolvedValue(userEntity);
      await expect(userSubscriber.beforeUpdate(updateEvent)).rejects.toThrow(
        new BadRequestException(`The email '${userEntity.email}' is already in use`)
      );
    });

    it('should throw BadRequestException when updating to an existing username', async () => {
      manager.getRepository(User).findOneBy = jest
        .fn()
        .mockResolvedValueOnce(null) // Email check passes
        .mockResolvedValueOnce(userEntity); // Username check fails

      await expect(userSubscriber.beforeUpdate(updateEvent)).rejects.toThrow(
        new BadRequestException(`The username '${userEntity.username}' is already in use`)
      );
    });

    it('should hash password if it has been changed', async () => {
      const newPassword = 'newPassword123';
      userEntity.password = newPassword;

      jest.spyOn(CryptUtil, 'generateSalt').mockResolvedValue('newSalt');
      jest.spyOn(CryptUtil, 'hashPassword').mockResolvedValue('newHashedPassword');

      manager.getRepository(User).findOneBy = jest.fn().mockResolvedValue(user); // Ensure user is found

      await userSubscriber.beforeUpdate(updateEvent);

      expect(CryptUtil.generateSalt).toHaveBeenCalledTimes(1);
      expect(CryptUtil.hashPassword).toHaveBeenCalledWith(newPassword, 'newSalt');
      expect(userEntity.password).toBe('newHashedPassword');
      expect(userEntity.salt).toBe('newSalt');
    });

    it('should not hash password if it has not changed', async () => {
      manager.getRepository(User).findOneBy = jest.fn().mockResolvedValue(userEntity); // Ensure user is found

      await userSubscriber.beforeUpdate(updateEvent);

      expect(CryptUtil.generateSalt).not.toHaveBeenCalled();
      expect(CryptUtil.hashPassword).not.toHaveBeenCalled();
    });
  });
});
