import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import { apiReference } from '@scalar/nestjs-api-reference';

export async function swaggerDoc(app: INestApplication, environment: string): Promise<void> {
  if (environment !== 'development') {
    return;
  }

  const docOptions = new DocumentBuilder()
    .setTitle('NestJS game API')
    .setVersion('1.0')
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 'jwt-token')
    .build();

  const document = SwaggerModule.createDocument(app, docOptions);

  app.use('/docs/scalar', apiReference({ theme: 'deepSpace', spec: { content: document } }));

  SwaggerModule.setup('/docs/swagger', app, document);
}
