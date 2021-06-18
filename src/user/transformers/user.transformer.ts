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
      firstName: user.firstName,
      lastName: user.lastName,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
