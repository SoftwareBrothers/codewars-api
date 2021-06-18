import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserChallengeRepository } from './repositories/user-challenge.repository';
import { ChallengeRepository } from './repositories/challenge.repository';
import { UserChallengeService } from './user-challenge.service';
import { UserChallengeController } from './user-challenge.controller';
import { UserChallengeTransformer } from './transformers/user-challenge.transformer';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ChallengeRepository,
      UserChallengeRepository,
    ]),
  ],
  controllers: [
    UserChallengeController,
  ],
  providers: [
    UserChallengeService,
    UserChallengeTransformer,
  ],
  exports: [
    UserChallengeService,
  ],
})
export class UserChallengeModule {}
