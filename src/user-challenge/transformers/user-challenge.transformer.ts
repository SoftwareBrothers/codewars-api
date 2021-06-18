import { Injectable } from '@nestjs/common';

import { UserChallengeResponse } from '../models/user-challenge.response';
import { UserChallenge } from '../models/user-challenge.entity';
@Injectable()
export class UserChallengeTransformer {
  public transform(userChallenge: UserChallenge): UserChallengeResponse {
    return {
      externalId: userChallenge.challenge.externalId,
      rankName: userChallenge.challenge.rankName,
      rankColor: userChallenge.challenge.rankColor,
      name: userChallenge.challenge.name,
      description: userChallenge.challenge.description,
      url: userChallenge.challenge.url,
      completedLanguages: userChallenge.languages,
      completedDate: userChallenge.date,
    };
  }

  public transformAll(userChallenges: UserChallenge[]): UserChallengeResponse[] {
    return userChallenges.map(userChallenge => this.transform(userChallenge));
  }
}
