import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export async function swaggerDoc(app: INestApplication, environment: string): Promise<void> {
  if (environment !== 'development') {
    return;
  }

  const docOptions = new DocumentBuilder()
    .setTitle('NestJS game API')
    .setVersion('1.0')
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 'access-token')
    .build();

  const document = SwaggerModule.createDocument(app, docOptions);

  SwaggerModule.setup('swagger', app, document);
}
