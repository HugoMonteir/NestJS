import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities';
import { DataSource } from 'typeorm';
import { UserSubscriber } from './user.subscriber';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: 'UserSubscriber',
      useFactory: (dataSource: DataSource): UserSubscriber => {
        const subscriber = new UserSubscriber();
        dataSource.subscribers.push(subscriber);
        return subscriber;
      },
      inject: [DataSource]
    }
  ]
})
export class UserModule {}
