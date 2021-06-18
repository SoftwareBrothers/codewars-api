import {
  EntityRepository,
  Repository,
} from 'typeorm';

import { Challenge } from '../models/challenge.entity';

@EntityRepository(Challenge)
export class ChallengeRepository extends Repository<Challenge> {
  public findByExternalId(externalId: string): Promise<Challenge | null> {
    return this.findOne({
      where: { externalId },
    });
  }

  public async findByIdOrCreate(id: string, data: Partial<Challenge>): Promise<Challenge> {
    let challenge = await this.findByExternalId(id);

    if (!challenge) {
      challenge = new Challenge();
      challenge.externalId = id;
      challenge.name = data.name;
      challenge.description = data.description;
      challenge.rank = data.rank;
      challenge.rankName = data.rankName;
      challenge.languages = data.languages;
      challenge.rankColor = data.rankColor;
      challenge.url = data.url;
      challenge.category = data.category;
      challenge.slug = data.slug;
      await challenge.save();
    }

    return challenge;
  }
}
