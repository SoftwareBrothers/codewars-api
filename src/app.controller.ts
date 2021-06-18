import { Controller, Get } from '@nestjs/common';

import { CodewarsService } from './codewars/codewars.service';
import { CodewarsUserDto } from './codewars/dto/codewars-user.dto';
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
  public test(): Promise<CodewarsUserDto> {
    return this.codewarsService.getUserData('przemyslaw-szejna-sb');
  }
}

