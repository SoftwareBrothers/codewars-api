import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { CodewarsProvider } from './providers/codewars.provider';
import { CodewarsUserDto } from './dto/codewars-user.dto';
import { UserTransformer } from './transformers/user.transformer';
import { CodewarsUserChallengeDto } from './dto/codewars-user-challenge.dto';
import { UserChallengeItemResponseDto } from './dto/user-challenge-item-response.dto';

@Injectable()
export class CodewarsService {
  public constructor(
        private readonly configService: ConfigService,
        private readonly provider: CodewarsProvider,
        private readonly transformer: UserTransformer,
  ) {}

  public async getUserData(username: string): Promise<CodewarsUserDto> {
    const data = await this.provider.getUserData(username);

    return this.transformer.transform(data);
  }

  public async getUserChallenges(username: string): Promise<CodewarsUserChallengeDto[]> {
    let page = 0;
    let challenges = [];
    let shouldFetch = true;

    while (shouldFetch) {
      const { totalPages, data } = await this.provider.getUserChallengesByPage(username, page++);
      challenges = [...challenges, ...data];
      shouldFetch = totalPages > page;
    }

    const promises = challenges.map(async (item: UserChallengeItemResponseDto) => {
      const challenge = await this.provider.getChallengeById(item.id);

      return {
        id: challenge.id,
        name: challenge.name,
        description: challenge.description,
        rank: challenge.rank.id,
        rankName: challenge.rank.name,
        rankColor: challenge.rank.color,
        languages: challenge.languages,
        date: new Date(item.completedAt),
        url: challenge.url,
        category: challenge.category,
        slug: challenge.slug,
        completedLanguages: item.completedLanguages
          .map(language => this.transformer.transformLanguage(language))
          .filter(language => !!language),
      };
    });

    return Promise.all(promises);
  }
}
