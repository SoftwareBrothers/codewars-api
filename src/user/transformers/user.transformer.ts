import { Injectable } from '@nestjs/common';

import { User } from '../models/user.entity';
import { UserResponse } from '../models/user.response';

@Injectable()
export class UserTransformer {
  public async transform(user: User): Promise<UserResponse> {
    return {
      id: user.id,
      username: user.username,
      name: user.name,
      honor: user.honor,
      clan: user.clan,
      leaderboardPosition: user.leaderboardPosition,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
