import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { CodewarsProvider } from './providers/codewars.provider';

@Injectable()
export class CodewarsService {
  public constructor(
        private readonly configService: ConfigService,
        private readonly provider: CodewarsProvider
  ) {}

  public async getUserData(login: string): Promise<void> {
    const user = await this.provider.getUserData(login);

  }
}
