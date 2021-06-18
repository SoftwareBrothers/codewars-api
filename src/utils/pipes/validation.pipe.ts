import { ValidationPipe } from '@nestjs/common';

export default new ValidationPipe({
  forbidUnknownValues: true,
  whitelist: true,
  forbidNonWhitelisted: true,
  transform: true,
});
