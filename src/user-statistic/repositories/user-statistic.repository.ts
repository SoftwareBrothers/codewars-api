import {
  EntityRepository,
  Repository,
} from 'typeorm';
import moment from 'moment';

import { UserStatistic } from '../models/user-statistic.entity';
import { SortOrderEnum } from '../../utils/enums/sort-order.enum';
import { LanguageEnum } from '../../utils/enums/language.enum';
import { Nullable } from '../../utils/types';

@EntityRepository(UserStatistic)
export class UserStatisticRepository extends Repository<UserStatistic> {
  public findUserStatistics(userId: number, date: Date, language: LanguageEnum): Promise<Nullable<UserStatistic>> {
    const format = 'YYYY-MM-DD';
    const month = moment(date).format(format);

    return this.createQueryBuilder('s')
      .andWhere(`to_char(date, '${format}') = :month`, { month })
      .andWhere('user_Id = :userId', { userId })
      .andWhere('language = :language', { language })
      .orderBy('date', SortOrderEnum.ASC)
      .getOne();
  }

  public findCurrentByUserIdAndLanguage(userId: number, language: LanguageEnum): Promise<Nullable<UserStatistic>> {
    return this.findOne({
      where: { userId,  language },
      order: { date: SortOrderEnum.DESC },
    });
  }

  public async upsertUserStatistics(
    userId: number,
    date: Date,
    language: LanguageEnum,
    score: number,
    rank: number,
    rankName: string,
    rankColor: string,
  ): Promise<UserStatistic> {
    let stats = await this.findUserStatistics(userId, date, language);

    if (!stats) {
      stats = new UserStatistic();
      stats.userId = userId;
      stats.language = language;
      stats.date = date;
    }

    stats.score = score;
    stats.rank = rank;
    stats.rankName = rankName;
    stats.rankColor = rankColor;

    return stats.save();
  }
}
