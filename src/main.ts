import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { swaggerDoc } from './common/docs';
import { serverConfig, dotenvConfig } from './configs';
import { ValidationPipe } from '@nestjs/common';
import { GlobalExceptionFilter, validationExceptionFactory } from './exceptions';

dotenvConfig();

async function bootstrap(): Promise<void> {
  const appServerConfig = serverConfig();
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ exceptionFactory: validationExceptionFactory }));
  app.useGlobalFilters(new GlobalExceptionFilter());
  app.enableCors(appServerConfig.cors);
  await swaggerDoc(app, appServerConfig.environment);
  await app.listen(appServerConfig.port);
}

bootstrap().then();
