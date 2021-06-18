import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';

import { BoardStatisticResponse } from './models/board-statistic.response';
import { BoardTransformer } from './transformers/board.transformer';
import { BoardService } from './board.service';

@Controller('board')
@ApiTags('Board')
export class BoardController {
  constructor(
    private readonly boardService: BoardService,
    private readonly boardTransformer: BoardTransformer
  ) {}

  @Get()
  @ApiOkResponse({ type: BoardStatisticResponse, isArray: true })
  public async getBoard(): Promise<BoardStatisticResponse[]> {
    const statistics = await this.boardService.getBoard();

    return this.boardTransformer.transformAll(statistics);
  }
}
