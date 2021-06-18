import { Controller, Get } from '@nestjs/common';

import { CodewarsService } from './codewars/codewars.service';
@Controller()
export class AppController {
  public constructor(
      private readonly codewarsService: CodewarsService
  ) {}

  @Get()
  public healthCheck(): { OK: boolean } {
    return { OK: true };
  }

  @Get('test')
  public async test(): Promise<void> {
    await this.codewarsService.getUserData('przemyslaw-szejna-sb');
  }
}

