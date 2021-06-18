import { HttpModule, Module } from '@nestjs/common';

import { CodewarsProvider } from './providers/codewars.provider';
import { CodewarsService } from './codewars.service';
import { UserTransformer } from './transformers/user.transformer';

@Module({
  imports: [
    HttpModule,
  ],
  controllers: [],
  providers: [
    CodewarsProvider,
    CodewarsService,
    UserTransformer,
  ],
  exports: [
    CodewarsService,
  ],
})
export class CodewarsModule {}
