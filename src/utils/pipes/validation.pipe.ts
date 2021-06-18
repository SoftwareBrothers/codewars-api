import { BadRequestException, ValidationPipe } from '@nestjs/common';

const validationPipe = new ValidationPipe({
  forbidUnknownValues: true,
  whitelist: true,
  forbidNonWhitelisted: true,
  transform: true,
  exceptionFactory: (errors): BadRequestException => new BadRequestException(errors),
});

export default validationPipe;
