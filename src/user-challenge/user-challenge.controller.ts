import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiNotFoundResponse } from '@nestjs/swagger';

import { UserChallengeResponse } from './models/user-challenge.response';
import { UserChallengeTransformer } from './transformers/user-challenge.transformer';
import { UserChallengeService } from './user-challenge.service';

@Controller('users/:userId/challenges')
@ApiTags('Users')
export class UserChallengeController {
  constructor(
    private readonly userChallengeService: UserChallengeService,
    private readonly userChallengeTransformer: UserChallengeTransformer
  ) {}

  @Get()
  @ApiOkResponse({ type: UserChallengeResponse, isArray: true })
  @ApiNotFoundResponse()
  public async getUserChallenges(@Param('userId') userId: number): Promise<UserChallengeResponse[]> {
    const userChallenges = await this.userChallengeService.findUserChallenges(userId);

    return this.userChallengeTransformer.transformAll(userChallenges);
  }
}
