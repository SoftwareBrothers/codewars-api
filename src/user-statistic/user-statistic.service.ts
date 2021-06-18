import { Injectable } from '@nestjs/common';

import { CodewarsUserDto } from '../codewars/dto/codewars-user.dto';
import { User } from '../user/models/user.entity';

import { UserStatisticRepository } from './repositories/user-statistic.repository';

@Injectable()
export class UserStatisticService {
  public constructor(
    private readonly userStatisticRepository: UserStatisticRepository,
  ) {}

  public async persistCodewarsUserStatistics(user: User, codewarsUserDto: CodewarsUserDto): Promise<void> {
    for (const stats of codewarsUserDto.statistics) {
      await this.userStatisticRepository.upsertUserStatistics(
        user.id,
        new Date(),
        stats.language,
        stats.score,
        stats.rank,
        stats.rankName,
        stats.rankColor,
      );
    }
  }
}
