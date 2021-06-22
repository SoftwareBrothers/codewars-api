import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserStatisticRepository } from './repositories/user-statistic.repository';
import { UserStatisticTransformer } from './transformers/user-statistic.transformer';
import { UserStatisticController } from './user-statistic.controller';
import { UserStatisticService } from './user-statistic.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserStatisticRepository]),
  ],
  providers: [
    UserStatisticService,
    UserStatisticTransformer,
  ],
  controllers: [
    UserStatisticController,
  ],
  exports: [
    UserStatisticService,
  ],
})
export class UserStatisticModule {}
