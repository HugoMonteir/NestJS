import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { swaggerDoc } from './common/docs';
import { serverConfig, dotenvConfig } from './configs';
import { ValidationPipe } from '@nestjs/common';
import { GlobalExceptionFilter, ValidationException } from './exceptions';
import { ValidationError } from './common/interfaces';

dotenvConfig();

async function bootstrap() {
  const appServerConfig = serverConfig();
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors) => {
        const result: ValidationError[] = errors.map((error) => ({
          field: error.property,
          message: error.constraints[Object.keys(error.constraints)[0]]
        }));
        return new ValidationException(result);
      }
    })
  );
  app.useGlobalFilters(new GlobalExceptionFilter());
  app.enableCors(appServerConfig.cors);
  await swaggerDoc(app, appServerConfig.environment);
  await app.listen(appServerConfig.port);
}

bootstrap().then();
