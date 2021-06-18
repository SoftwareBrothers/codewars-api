import {
  EntityRepository,
  Repository,
} from 'typeorm';

import { UserStatistic } from '../models/user-statistic.entity';

@EntityRepository(UserStatistic)
export class UserStatisticRepository extends Repository<UserStatistic> {
}
