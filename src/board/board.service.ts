import { Injectable } from '@nestjs/common';

import { UserRepository } from '../user/repositories/user.repository';
import { Paginated } from '../utils/types';

import { GetBoardDto } from './dto/get-board.dto';
import { BoardStatistic } from './models/board-statistic.interface';

@Injectable()
export class BoardService {
  constructor(
    private readonly userRepository: UserRepository,
  ) {}

  public getBoard(getBoardDto: GetBoardDto): Promise<Paginated<BoardStatistic>> {
    return this.userRepository.getUsersWithStatisticsQueryBuilder(getBoardDto);
  }
}
