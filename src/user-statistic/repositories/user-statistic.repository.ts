import {
  EntityRepository,
  Repository,
} from 'typeorm';
import moment from 'moment';

import { UserStatistic } from '../models/user-statistic.entity';
import { LanguageEnum } from '../../utils/enums/language.enum';
import { SortOrderEnum } from '../../utils/enums/sort-order.enum';

@EntityRepository(UserStatistic)
export class UserStatisticRepository extends Repository<UserStatistic> {
  public findUserStatistics(userId: number, date: Date, language: LanguageEnum): Promise<UserStatistic | null> {
    const format = 'YYYY-MM-DD';
    const month = moment(date).format(format);

    return this.createQueryBuilder('s')
      .andWhere(`to_char(date, '${format}') = :month`, { month })
      .andWhere('user_Id = :userId', { userId })
      .andWhere('language = :language', { language })
      .orderBy('date', SortOrderEnum.ASC)
      .getOne();
  }

  public async upsertUserStatistics(userId: number, date: Date, language: LanguageEnum, score: number): Promise<UserStatistic> {
    let stats = await this.findUserStatistics(userId, date, language);

    if (!stats) {
      stats = new UserStatistic();
      stats.userId = userId;
      stats.language = language;
      stats.date = date;
    }

    stats.score = score;

    return stats.save();
  }
}
