import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserStatisticRepository } from './repositories/user-statistic.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserStatisticRepository]),
  ],
})
export class UserStatisticModule {}
