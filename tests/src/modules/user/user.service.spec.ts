import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../../../../src/modules/user/user.service';
import { User } from '../../../../src/modules/user/entities';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateUserDto, UserResponseDto } from '../../../../src/modules/user/dto';
import { UserNotFoundException, BadCredentialsException } from '../../../../src/exceptions';
import { createUserDtoMock, userMock, userResponseDtoMock } from './user-data-mock.constants';
import { CryptUtil } from '../../../../src/common/utils/crypt.util';
import { plainToInstance } from 'class-transformer';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOneBy: jest.fn().mockReturnValue(userMock),
            create: jest.fn().mockReturnValue(userMock),
            save: jest.fn().mockReturnValue(userMock)
          }
        }
      ]
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  describe('create', () => {
    it('should create a new user', async () => {
      // Arrange
      const body: CreateUserDto = { ...createUserDtoMock };
      const response: UserResponseDto = { ...userResponseDtoMock };

      // Act
      const result = await userService.create(body);

      // Assert
      expect(response).toEqual(plainToInstance(UserResponseDto, result, { excludeExtraneousValues: true }));
      expect(userRepository.create).toHaveBeenCalledTimes(1);
      expect(userRepository.create).toHaveBeenCalledWith(body);
      expect(userRepository.save).toHaveBeenCalledTimes(1);
      expect(userRepository.save).toHaveBeenCalledWith({ ...userMock });
    });
  });

  describe('findOne', () => {
    it('should find a user by Id', async () => {
      // Arrange
      const id = 1;
      const response: UserResponseDto = { ...userResponseDtoMock, id };

      // Act
      const result = await userService.findOne(id);

      // Assert
      expect(response).toEqual(plainToInstance(UserResponseDto, result, { excludeExtraneousValues: true }));
      expect(userRepository.findOneBy).toHaveBeenCalledTimes(1);
      expect(userRepository.findOneBy).toHaveBeenCalledWith({ id });
    });

    it('should throw an error if user does not exist', async () => {
      // Arrange
      const id = -1;
      jest.spyOn(userRepository, 'findOneBy').mockResolvedValueOnce(null);

      // Act & Assert
      await expect(userService.findOne(id)).rejects.toThrow(new UserNotFoundException('This user does not exist'));
      expect(userRepository.findOneBy).toHaveBeenCalledTimes(1);
      expect(userRepository.findOneBy).toHaveBeenCalledWith({ id });
    });
  });

  describe('validateUserByEmailAndPassword', () => {
    it('should validate user with correct email and password', async () => {
      // Arrange
      const email = userMock.email;
      const password = 'Hugo123#';
      const response: UserResponseDto = { ...userResponseDtoMock };
      jest.spyOn(CryptUtil, 'validatePassword').mockResolvedValueOnce(true);

      // Act
      const result = await userService.validateUserByEmailAndPassword(email, password);

      // Assert
      expect(response).toEqual(plainToInstance(UserResponseDto, result, { excludeExtraneousValues: true }));
      expect(userRepository.findOneBy).toHaveBeenCalledTimes(1);
      expect(userRepository.findOneBy).toHaveBeenCalledWith({ email });
      expect(CryptUtil.validatePassword).toHaveBeenCalledTimes(1);
      expect(CryptUtil.validatePassword).toHaveBeenCalledWith('Hugo123#', userMock.password, userMock.salt);
    });

    it('should throw an error if user does not exist', async () => {
      // Arrange
      const email = 'wrong@email.com';
      const password = 'Hugo123#';
      jest.spyOn(userRepository, 'findOneBy').mockResolvedValueOnce(null);

      // Act & Assert
      await expect(userService.validateUserByEmailAndPassword(email, password)).rejects.toThrow(
        new BadCredentialsException('Invalid email or password')
      );
      expect(userRepository.findOneBy).toHaveBeenCalledTimes(1);
      expect(userRepository.findOneBy).toHaveBeenCalledWith({ email });
    });

    it('should throw an error if password is incorrect', async () => {
      // Arrange
      const email = userMock.email;
      const password = 'wrongPassword';
      jest.spyOn(CryptUtil, 'validatePassword').mockResolvedValueOnce(false);

      // Act & Assert
      await expect(userService.validateUserByEmailAndPassword(email, password)).rejects.toThrow(
        new BadCredentialsException('Invalid email or password')
      );
      expect(userRepository.findOneBy).toHaveBeenCalledTimes(1);
      expect(userRepository.findOneBy).toHaveBeenCalledWith({ email });
      expect(CryptUtil.validatePassword).toHaveBeenCalledTimes(1);
      expect(CryptUtil.validatePassword).toHaveBeenCalledWith(password, userMock.password, userMock.salt);
    });
  });
});
