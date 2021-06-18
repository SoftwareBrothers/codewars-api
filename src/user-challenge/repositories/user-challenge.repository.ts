import {
  EntityRepository,
  Repository,
} from 'typeorm';

import { UserChallenge } from '../models/user-challenge.entity';
import { LanguageEnum } from '../../utils/enums/language.enum';

@EntityRepository(UserChallenge)
export class UserChallengeRepository extends Repository<UserChallenge> {
  public findByUserIdAndChallengeId(userId: number, challengeId: number): Promise<UserChallenge | null> {
    return this.findOne({
      where: { userId,  challengeId },
    });
  }

  public async addChallenge(userId: number, challengeId: number, date: Date, completedLanguages: LanguageEnum[]): Promise<UserChallenge> {
    let userChallenge = await this.findByUserIdAndChallengeId(userId, challengeId);

    if (!userChallenge) {
      userChallenge = new UserChallenge();
      userChallenge.userId = userId;
      userChallenge.challengeId = challengeId;
      userChallenge.date = date;
      userChallenge.languages = completedLanguages;
      await userChallenge.save();
    }

    return userChallenge;
  }
}
