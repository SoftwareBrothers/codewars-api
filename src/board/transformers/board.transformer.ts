import { Injectable } from '@nestjs/common';

import { BoardStatistic } from '../models/board-statistic.interface';
import { BoardStatisticResponse } from '../models/board-statistic.response';

export interface UserTransformerOptions {
  includeBrands?: boolean;
}

@Injectable()
export class BoardTransformer {

  public transform(statistic: BoardStatistic): BoardStatisticResponse {
    return {
      rank: statistic.rank,
      name: statistic.name,
      score: statistic.score,
    };
  }

  public transformAll(statistics: BoardStatistic[]): Promise<BoardStatisticResponse[]> {
    return Promise.all(statistics.map(statistic => this.transform(statistic)));
  }
}
