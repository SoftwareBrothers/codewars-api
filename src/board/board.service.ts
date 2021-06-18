import { Injectable } from '@nestjs/common';

import { BoardStatistic } from './models/board-statistic.interface';

@Injectable()
export class BoardService {
  public async getBoard(): Promise<BoardStatistic[]> {
    return [
      {
        rank: '3 kyu',
        name: 'Paweł Lorenc',
        score: 528,
      },
      {
        rank: '4 kyu',
        name: 'Jonasz Wiącek',
        score: 400,
      },
    ];
  }
}
