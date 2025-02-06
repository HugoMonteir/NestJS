import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities';
import { Repository } from 'typeorm';
import { CreateUserDto, UserDto } from './dto';
import { plainToInstance } from 'class-transformer';
import { BadCredentialsException, UserNotFoundException } from '../../exceptions';
import { CryptUtil } from '../../common/utils/crypt.util';

@Injectable()
export class UserService {
  public constructor(
    @InjectRepository(User)
    private repository: Repository<User>
  ) {}

  public async create(createUser: CreateUserDto): Promise<UserDto> {
    const user = this.repository.create(createUser);
    const dbUser = await this.repository.save(user);
    return plainToInstance(UserDto, dbUser);
  }

  public async findOne(id: number): Promise<UserDto> {
    const user = await this.repository.findOneBy({ id });

    if (!user) {
      throw new UserNotFoundException('This user does not exist');
    }

    return plainToInstance(UserDto, user);
  }

  public async validateUserByEmailAndPassword(email: string, password: string): Promise<UserDto> {
    const user = await this.repository.findOneBy({ email });

    if (!user) {
      throw new BadCredentialsException('Invalid email or password');
    }

    if (!(await CryptUtil.validatePassword(password, user.password, user.salt))) {
      throw new BadCredentialsException('Invalid email or password');
    }

    return plainToInstance(UserDto, user);
  }
}
