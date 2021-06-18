import { HttpService, Injectable } from '@nestjs/common';

import { CodewarsUserDto } from '../dto/codewars-user.dto';

@Injectable()
export class CodewarsProvider {
    private readonly baseUrl = 'https://www.codewars.com/api/v1/';

    public constructor(
        private readonly httpService: HttpService
    ) {}

    public async getUserData(login: string): Promise<CodewarsUserDto> {
      const url = `${this.baseUrl}users/${login}`;

      const { data } = await this.httpService.get(url).toPromise();

      return data as CodewarsUserDto;
    }
}
