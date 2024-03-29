import { Injectable } from '@nestjs/common';

import { CodewarsUserDto } from '../dto/codewars-user.dto';
import { UserResponseDto } from '../dto/user-response.dto';
import { LanguageEnum } from '../../utils/enums/language.enum';
import { LanguageEnum as CodewarsLanguageEnum } from '../enums/language.enum';

@Injectable()
export class UserTransformer {
  public transform(user: UserResponseDto): CodewarsUserDto {
    const languages = Object.keys(user.ranks.languages).filter((language: string) => [
      LanguageEnum.Javascript.valueOf(),
      LanguageEnum.Typescript.valueOf(),
    ].includes(language.toUpperCase()));

    const statistics = languages.map((language: string) => ({
      language: this.transformLanguage(language),
      score: user.ranks.languages[language].score,
      rank: user.ranks.overall.rank,
      rankName: user.ranks.overall.name,
      rankColor: user.ranks.overall.color,
    }));

    return {
      username: user.username,
      name: user.name,
      clan: user.clan,
      honor: user.honor,
      codeChallenges: user.codeChallenges,
      leaderboardPosition: user.leaderboardPosition,
      statistics: [
        {
          language: LanguageEnum.General,
          score: user.ranks.overall.score,
          rank: user.ranks.overall.rank,
          rankName: user.ranks.overall.name,
          rankColor: user.ranks.overall.color,
        },
        ...statistics,
      ],
    };
  }

  public transformLanguage(language: string): LanguageEnum {
    switch (language) {
      case CodewarsLanguageEnum.JavaScript:
        return LanguageEnum.Javascript;
      case CodewarsLanguageEnum.TypeScript:
        return LanguageEnum.Typescript;
    }
  }
}
