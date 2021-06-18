import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiBadRequestResponse } from '@nestjs/swagger';

import { Paginated } from '../utils/types';

import { BoardStatisticResponse, PaginatedBoardStatisticResponse } from './models/board-statistic.response';
import { BoardTransformer } from './transformers/board.transformer';
import { BoardService } from './board.service';
import { GetBoardDto } from './dto/get-board.dto';

@Controller('board')
@ApiTags('Board')
export class BoardController {
  constructor(
    private readonly boardService: BoardService,
    private readonly boardTransformer: BoardTransformer
  ) {}

  @Get()
  @ApiOkResponse({ type: PaginatedBoardStatisticResponse })
  @ApiBadRequestResponse()
  public async getBoard(@Query() getBoardDto: GetBoardDto): Promise<Paginated<BoardStatisticResponse>> {
    const paginatedBoardStatistics = await this.boardService.getBoard(getBoardDto);

    return this.boardTransformer.transformPaginated(paginatedBoardStatistics);
  }
}
