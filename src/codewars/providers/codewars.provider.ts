import { HttpService, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { UserResponseDto } from '../dto/user-response.dto';
import { UserChallengeResponseDto } from '../dto/user-challenge-response.dto';
import { ChallengeResponseDto } from '../dto/challenge-response.dto';

@Injectable()
export class CodewarsProvider {
    private readonly baseUrl: string;

    public constructor(
        private readonly configService: ConfigService,
        private readonly httpService: HttpService
    ) {
      this.baseUrl = configService.get('codewars.baseApiUrl');
    }

    public async getUserData(username: string): Promise<UserResponseDto> {
      const url = `${this.baseUrl}/users/${username}`;

      const { data } = await this.httpService.get(url).toPromise();

      return data as UserResponseDto;
    }

    public async getUserChallengesByPage(username: string, page: number): Promise<UserChallengeResponseDto> {
      const url = `${this.baseUrl}/users/${username}/code-challenges/completed?page=${page}`;

      const { data } = await this.httpService.get(url).toPromise();

      return data as UserChallengeResponseDto;
    }

    public async getChallengeById(id: string): Promise<ChallengeResponseDto> {
      const url = `${this.baseUrl}/code-challenges/${id}`;

      const { data } = await this.httpService.get(url).toPromise();

      return data as ChallengeResponseDto;
    }
}
