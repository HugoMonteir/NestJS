import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { TYPEORM_CONFIG } from '../common/constants';

export const typeormConfig = registerAs(TYPEORM_CONFIG, (): TypeOrmModuleOptions => {
  return {
    type: 'postgres',
    url: process.env.DATABASE_URL ?? 'postgres://root:12345678@localhost:5432/game',
    migrationsRun: process.env.DATABASE_MIGRATIONS_RUN === 'true',
    migrations: [__dirname + '/../migrations/*.{js,ts}'],
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: process.env.DATABASE_SYNCHRONIZE === 'true',
    autoLoadEntities: true,
    logging: true,
    logger: 'file'
  };
});
