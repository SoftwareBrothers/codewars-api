import { HttpService, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { UserResponseDto } from '../dto/user-response.dto';

@Injectable()
export class CodewarsProvider {
    private readonly baseUrl: string;

    public constructor(
        private readonly configService: ConfigService,
        private readonly httpService: HttpService
    ) {
      this.baseUrl = configService.get('codewars.baseApiUrl');
    }

    public async getUserData(login: string): Promise<UserResponseDto> {
      const url = `${this.baseUrl}/users/${login}`;

      const { data } = await this.httpService.get(url).toPromise();

      return data as UserResponseDto;
    }
}
