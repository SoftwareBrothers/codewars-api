import { Injectable } from '@nestjs/common';

import { CodewarsUserDto } from '../codewars/dto/codewars-user.dto';
import { User } from '../user/models/user.entity';
import { LanguageEnum } from '../utils/enums/language.enum';

import { UserStatistic } from './models/user-statistic.entity';
import { UserStatisticRepository } from './repositories/user-statistic.repository';

@Injectable()
export class UserStatisticService {
  public constructor(
    private readonly userStatisticRepository: UserStatisticRepository,
  ) {}

  public async findCurrentUserChallenges(userId: number): Promise<UserStatistic[]> {
    const languages = Object.values(LanguageEnum);

    const statistics = await Promise.all(languages.map(
      language => this.userStatisticRepository.findCurrentByUserIdAndLanguage(userId, language)
    ));

    return statistics.filter(Boolean);
  }

  public async persistCodewarsUserStatistics(user: User, codewarsUserDto: CodewarsUserDto): Promise<void> {
    for (const stats of codewarsUserDto.statistics) {
      await this.userStatisticRepository.upsertUserStatistics(
        user.id,
        new Date(),
        stats.language,
        stats.score,
        stats.rank,
        stats.rankName,
        stats.rankColor,
      );
    }
  }
}
