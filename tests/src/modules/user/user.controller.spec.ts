import { createUserDto, userResponseDto } from './user-data-mock.constants';
import { UserController } from '../../../../src/modules/user/user.controller';
import { UserService } from '../../../../src/modules/user/user.service';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto, UserDto } from '../../../../src/modules/user/dto';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            create: jest.fn().mockReturnValue({ ...userResponseDto })
          }
        }
      ]
    }).compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    // Assert
    expect(userController).toBeDefined();
    expect(userService).toBeDefined();
  });

  describe('create', () => {
    it('should create a new user', async () => {
      // Arrange
      const body: CreateUserDto = { ...createUserDto };
      const response: UserDto = { ...userResponseDto };

      // Act
      const result = await userController.create(body);

      // Assert
      expect(result).toEqual(response);
      expect(userService.create).toHaveBeenCalledTimes(1);
      expect(userService.create).toHaveBeenCalledWith(body);
    });
  });

  describe('getProfile', () => {
    it('should return the authenticated user', async () => {
      // Arrange
      const mockUser: UserDto = { ...userResponseDto };

      // Act
      const result = await userController.getProfile(mockUser);

      // Assert
      expect(result).toEqual(mockUser);
    });
  });
});
