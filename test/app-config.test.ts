import { INestApplication } from '@nestjs/common';
import { TestingModule } from '@nestjs/testing';

import validationPipe from '../src/utils/pipes/validation.pipe';

export const configureTestApp = (
  moduleFixture: TestingModule
): INestApplication => {
  const app = moduleFixture.createNestApplication();
  app.useGlobalPipes(validationPipe);

  return app;
};
