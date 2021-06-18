import { HttpModule, HttpService, Module } from '@nestjs/common';

import { CodewarsProvider } from './providers/codewars.provider';
import { CodewarsService } from './codewars.service';

@Module({
  imports: [
    HttpModule,
  ],
  controllers: [],
  providers: [
    CodewarsProvider,
    CodewarsService,
  ],
  exports: [
    CodewarsService,
  ],
})
export class CodewarsModule {}
