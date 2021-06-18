import { NestFactory } from '@nestjs/core';
import * as Sentry from '@sentry/node';

import { AppModule } from './app.module';
import SwaggerSetup from './config/swagger.config';
import validationPipe from './utils/pipes/validation.pipe';
import { SentryInterceptor } from './utils/interceptors/sentry.interceptor';
import { shouldSentryBeEnabled } from './utils/constants';

const bootstrap = async (): Promise<void> => {
  try {
    const app = await NestFactory.create(AppModule);
    app.enableCors();

    SwaggerSetup(app);

    app.enableCors();
    app.useGlobalPipes(validationPipe);

    if (shouldSentryBeEnabled()) {
      Sentry.init({
        dsn: process.env.SENTRY_DSN,
        environment: process.env.ENVIRONMENT,
      });
      app.useGlobalInterceptors(new SentryInterceptor());
    }

    await app.listen(process.env.PORT);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log('Error occurred when starting Nest', e);
  }
};

void bootstrap();
