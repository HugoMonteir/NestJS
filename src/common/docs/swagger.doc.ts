import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export async function swaggerDoc(app: INestApplication, environment: string) {
  if (environment !== 'development') {
    return;
  }

  const docOptions = new DocumentBuilder().setTitle('NestJS game API').setVersion('1.0').build();

  const document = SwaggerModule.createDocument(app, docOptions);

  SwaggerModule.setup('swagger', app, document);
}
