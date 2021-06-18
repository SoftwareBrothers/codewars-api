import { Injectable } from '@nestjs/common';

import { Paginated } from '../../utils/types';
import { BoardStatistic } from '../models/board-statistic.interface';
import { BoardStatisticResponse } from '../models/board-statistic.response';

@Injectable()
export class BoardTransformer {
  public transform(statistic: BoardStatistic): BoardStatisticResponse {
    return {
      id: statistic.id,
      rank: statistic.rank,
      name: statistic.name,
      username: statistic.username,
      score: statistic.score ?? 0,
    };
  }

  public transformAll(statistics: BoardStatistic[]): BoardStatisticResponse[] {
    return statistics.map(statistic => this.transform(statistic));
  }

  public async transformPaginated(
    statistics: Paginated<BoardStatistic>,
  ): Promise<Paginated<BoardStatisticResponse>> {
    return {
      items: this.transformAll(statistics.items),
      meta: statistics.meta,
    };
  }
}
