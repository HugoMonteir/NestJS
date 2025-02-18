import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities';
import { Repository } from 'typeorm';
import { CreateUserDto, UserResponseDto } from './dto';
import { plainToInstance } from 'class-transformer';
import { BadCredentialsException, UserNotFoundException } from '../../exceptions';
import { CryptUtil } from '../../common/utils/crypt.util';

@Injectable()
export class UserService {
  public constructor(
    @InjectRepository(User)
    private repository: Repository<User>
  ) {}

  public async create(createUser: CreateUserDto): Promise<UserResponseDto> {
    const user = this.repository.create(createUser);
    const dbUser = await this.repository.save(user);
    return plainToInstance(UserResponseDto, dbUser);
  }

  public async findOne(id: number): Promise<UserResponseDto> {
    const user = await this.repository.findOneBy({ id });

    if (!user) {
      throw new UserNotFoundException('This user does not exist');
    }

    return plainToInstance(UserResponseDto, user);
  }

  public async validateUserByEmailAndPassword(email: string, password: string): Promise<UserResponseDto> {
    const user = await this.repository.findOneBy({ email });

    if (!user) {
      throw new BadCredentialsException('Invalid email or password');
    }

    if (!(await CryptUtil.validatePassword(password, user.password, user.salt))) {
      throw new BadCredentialsException('Invalid email or password');
    }

    return plainToInstance(UserResponseDto, user);
  }
}
