import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities';
import { DataSource } from 'typeorm';
import { UserSubscriber } from './user.subscriber';
import { subscriberFactory } from '../../common/factories';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: 'UserSubscriber',
      useFactory: subscriberFactory<UserSubscriber>(UserSubscriber),
      inject: [DataSource]
    }
  ],
  exports: [UserService]
})
export class UserModule {}
