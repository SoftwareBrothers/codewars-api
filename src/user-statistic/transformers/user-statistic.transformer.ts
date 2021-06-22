import { Injectable } from '@nestjs/common';

import { UserStatisticResponse } from '../models/user-statistic.response';
import { UserStatistic } from '../models/user-statistic.entity';

@Injectable()
export class UserStatisticTransformer {
  public transform(userStatistic: UserStatistic): UserStatisticResponse {
    return {
      userId: userStatistic.userId,
      language: userStatistic.language,
      score: userStatistic.score,
      rank: userStatistic.rank,
      rankName: userStatistic.rankName,
      rankColor: userStatistic.rankColor,
      date: userStatistic.date,
    };
  }

  public transformAll(userStatistics: UserStatistic[]): UserStatisticResponse[] {
    return userStatistics.map(userStatistic => this.transform(userStatistic));
  }
}
