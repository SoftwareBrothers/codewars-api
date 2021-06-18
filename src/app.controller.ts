import { Controller, Get } from '@nestjs/common';
@Controller()
export class AppController {
  @Get()
  @Public()
  public healthCheck(): { OK: boolean } {
    return { OK: true };
  }
}
