import { Injectable } from '@nestjs/common';

import { User } from '../user/models/user.entity';
import { CodewarsUserChallengeDto } from '../codewars/dto/codewars-user-challenge.dto';

import { UserChallengeRepository } from './repositories/user-challenge.repository';
import { ChallengeRepository } from './repositories/challenge.repository';

@Injectable()
export class UserChallengeService {
  public constructor(
    private readonly challengeRepository: ChallengeRepository,
    private readonly userChallengeRepository: UserChallengeRepository,
  ) {}

  public async persistCodewarsUserChallenges(user: User, challenges: CodewarsUserChallengeDto[]): Promise<void> {
    const promises = challenges.map(async (data: CodewarsUserChallengeDto) => {
      const challenge = await this.challengeRepository.findByIdOrCreate(data.id, {
        name: data.name,
        description: data.description,
        rank: data.rank,
        rankName: data.rankName,
        rankColor: data.rankColor,
        languages: data.languages,
        url: data.url,
        category: data.category,
        slug: data.slug,
      });

      return this.userChallengeRepository.addChallenge(
        user.id,
        challenge.id,
        data.date,
        data.completedLanguages
      );
    });

    await Promise.all(promises);
  }
}
