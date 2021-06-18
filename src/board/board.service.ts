import { Injectable } from '@nestjs/common';

import { UserRepository } from '../user/repositories/user.repository';

import { GetBoardDto } from './dto/get-board.dto';
import { BoardStatistic } from './models/board-statistic.interface';

@Injectable()
export class BoardService {
  constructor(
    private readonly userRepository: UserRepository,
  ) {}

  public async getBoard(getBoardDto: GetBoardDto): Promise<BoardStatistic[]> {
    const users = await this.userRepository.getAll();

    return users.map(user => ({
      rank: '3 kyu',
      name: `${user.firstName} ${user.lastName}`,
      score: Math.floor(Math.random() * 1000),
    }));
  }
}
