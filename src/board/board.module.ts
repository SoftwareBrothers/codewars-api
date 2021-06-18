import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserStatisticRepository } from '../user-statistic/repositories/user-statistic.repository';

import { BoardController } from './board.controller';
import { BoardService } from './board.service';
import { BoardTransformer } from './transformers/board.transformer';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserStatisticRepository]),
  ],
  providers: [BoardTransformer, BoardService],
  controllers: [BoardController],
})
export class BoardModule {}
