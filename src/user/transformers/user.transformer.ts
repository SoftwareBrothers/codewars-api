import { Injectable } from '@nestjs/common';

import { User } from '../models/user.entity';
import { UserResponse } from '../models/user.response';

export interface UserTransformerOptions {
  includeBrands?: boolean;
}

@Injectable()
export class UserTransformer {
  public async transform(user: User): Promise<UserResponse> {
    return {
      id: user.id,
      username: user.username,
      name: user.name,
      rank: user.rank,
      honor: user.honor,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
