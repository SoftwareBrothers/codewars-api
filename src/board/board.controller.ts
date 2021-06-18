import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';

import { Paginated } from '../utils/types';

import { BoardStatisticResponse } from './models/board-statistic.response';
import { BoardTransformer } from './transformers/board.transformer';
import { BoardService } from './board.service';
import { GetBoardDto } from './dto/get-board.dto';
import { BoardStatistic } from './models/board-statistic.interface';

@Controller('board')
@ApiTags('Board')
export class BoardController {
  constructor(
    private readonly boardService: BoardService,
    private readonly boardTransformer: BoardTransformer
  ) {}

  @Get()
  @ApiOkResponse({ type: BoardStatisticResponse, isArray: true })
  public async getBoard(@Query() getBoardDto: GetBoardDto): Promise<Paginated<BoardStatistic>> {
    const paginatedBoardStatistics = await this.boardService.getBoard(getBoardDto);

    return this.boardTransformer.transformPaginated(paginatedBoardStatistics);
  }
}
