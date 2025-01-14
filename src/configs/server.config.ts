import { registerAs } from '@nestjs/config';
import { ServerConfigInterface } from '../common/interfaces';
import { SERVER_CONFIG } from '../common/constants';
import * as process from 'node:process';

export const serverConfig = registerAs(
  SERVER_CONFIG,
  (): ServerConfigInterface => ({
    environment: process.env.NODE_ENV ?? 'development',
    port: parseInt(process.env.PORT) ?? 3000,
    cors: {
      origin: process.env.CORS_ORIGIN ?? '*'
    }
  })
);
