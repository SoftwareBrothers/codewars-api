import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserChallengeRepository } from './repositories/user-challenge.repository';
import { ChallengeRepository } from './repositories/challenge.repository';
import { UserChallengeService } from './user-challenge.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ChallengeRepository,
      UserChallengeRepository,
    ]),
  ],
  providers: [
    UserChallengeService,
  ],
  exports: [
    UserChallengeService,
  ],
})
export class UserChallengeModule {}
