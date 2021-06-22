import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiNotFoundResponse } from '@nestjs/swagger';

import { UserStatisticResponse } from './models/user-statistic.response';
import { UserStatisticTransformer } from './transformers/user-statistic.transformer';
import { UserStatisticService } from './user-statistic.service';

@Controller('users/:userId/statistics')
@ApiTags('Users')
export class UserStatisticController {
  constructor(
    private readonly userStatisticService: UserStatisticService,
    private readonly userStatisticTransformer: UserStatisticTransformer
  ) {}

  @Get('current')
  @ApiOkResponse({ type: UserStatisticResponse, isArray: true })
  @ApiNotFoundResponse()
  public async getUserCurrentStatistics(@Param('userId') userId: number): Promise<UserStatisticResponse[]> {
    const userStatistics = await this.userStatisticService.findCurrentUserChallenges(userId);

    return this.userStatisticTransformer.transformAll(userStatistics);
  }
}
