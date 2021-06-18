import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserStatisticRepository } from './repositories/user-statistic.repository';
import { UserStatisticService } from './user-statistic.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserStatisticRepository]),
  ],
  providers: [
    UserStatisticService,
  ],
  exports: [
    UserStatisticService,
  ],
})
export class UserStatisticModule {}
