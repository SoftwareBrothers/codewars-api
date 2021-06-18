import { NotFoundException } from '@nestjs/common';
import {
  EntityRepository,
  IsNull,
  Repository,
} from 'typeorm';
import { ErrorEnum } from '../../error.enum';
import { Nullable } from '../../utils/types';
import { User } from '../models/user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  public findById(userId: number): Promise<Nullable<User>> {
    return this.findOne(userId, {
      where: { deletedAt: IsNull() },
    });
  }

  public async getById(userId: number): Promise<User> {
    const user = await this.findById(userId);

    if (!user) {
      throw new NotFoundException(ErrorEnum.UserNotFound);
    }

    return user;
  }
}
