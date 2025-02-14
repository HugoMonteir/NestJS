import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { GameController } from './game.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game } from './entities';
import { DataSource } from 'typeorm';
import { GameSubscriber } from './game.subscriber';
import { subscriberFactory } from '../../common/factories';

@Module({
  imports: [TypeOrmModule.forFeature([Game])],
  controllers: [GameController],
  providers: [
    GameService,
    {
      provide: 'GameSubscriber',
      useFactory: subscriberFactory<GameSubscriber>(GameSubscriber),
      inject: [DataSource]
    }
  ]
})
export class GameModule {}
