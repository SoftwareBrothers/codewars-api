import { NestFactory } from '@nestjs/core';
import { useContainer } from 'typeorm';

import { AppModule } from './app.module';
import SwaggerSetup from './config/swagger.config';
import { SanitizePipe } from './utils/pipes/sanitize.pipe';
import validationPipe from './utils/pipes/validation.pipe';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);

  SwaggerSetup(app);

  app.enableCors();
  app.useGlobalPipes(new SanitizePipe());
  app.useGlobalPipes(validationPipe);

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  await app.listen(3000);
};

bootstrap();
