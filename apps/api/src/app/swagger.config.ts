import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as express from 'express';
import * as path from 'path';

export function setupSwagger(app: INestApplication): void {
  // Static swagger files server
  const swaggerUiPath = path.join(
    process.cwd(),
    'node_modules',
    'swagger-ui-dist',
  );
  app.use('/swagger-ui', express.static(swaggerUiPath));

  // OpenAPI/Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Users API')
    .setDescription('Users management API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
}
