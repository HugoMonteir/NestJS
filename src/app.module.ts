import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { GameModule } from './modules/game/game.module';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { typeormConfig } from './configs/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerMiddleware } from './middlewares';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeormConfig]
    }),
    TypeOrmModule.forRootAsync({
      inject: [typeormConfig.KEY],
      useFactory: async (config: ConfigType<typeof typeormConfig>) => config
    }),
    GameModule,
    AuthModule,
    UserModule
  ]
})
export class AppModule implements NestModule {
  public configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes('');
  }
}
