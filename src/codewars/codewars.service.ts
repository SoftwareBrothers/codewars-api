import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { CodewarsProvider } from './providers/codewars.provider';
import { CodewarsUserDto } from './dto/codewars-user.dto';
import { UserTransformer } from './transformers/user.transformer';

@Injectable()
export class CodewarsService {
  public constructor(
        private readonly configService: ConfigService,
        private readonly provider: CodewarsProvider,
        private readonly transformer: UserTransformer,
  ) {}

  public async getUserData(login: string): Promise<CodewarsUserDto> {
    const data = await this.provider.getUserData(login);

    return this.transformer.transform(data);
  }
}
