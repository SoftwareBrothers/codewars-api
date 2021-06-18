import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserStatisticRepository } from '../user-statistic/repositories/user-statistic.repository';
import { UserRepository } from '../user/repositories/user.repository';

import { BoardController } from './board.controller';
import { BoardService } from './board.service';
import { BoardTransformer } from './transformers/board.transformer';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserStatisticRepository,
      UserRepository,
    ]),
  ],
  providers: [BoardTransformer, BoardService],
  controllers: [BoardController],
})
export class BoardModule {}
