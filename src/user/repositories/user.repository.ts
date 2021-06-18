import { NotFoundException } from '@nestjs/common';
import {
  EntityRepository,
  IsNull,
  Repository,
} from 'typeorm';

import { GetBoardDto } from '../../board/dto/get-board.dto';
import { BoardStatistic } from '../../board/models/board-statistic.interface';
import { ErrorEnum } from '../../error.enum';
import { Nullable, Paginated } from '../../utils/types';
import { User } from '../models/user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  public findById(userId: number): Promise<Nullable<User>> {
    return this.findOne(userId, {
      where: { deletedAt: IsNull() },
    });
  }

  public getAll(): Promise<User[]> {
    return this.find({
      where: { deletedAt: IsNull() },
    });
  }

  public async getUsersWithStatisticsQueryBuilder(getBoardDto: GetBoardDto): Promise<Paginated<BoardStatistic>> {
    const queryBuilder = this.query(`
    select u.id, u.username, u.name, u.rank, s.score 
    from users u
    left join (
        select distinct on (user_id) us.*
        from user_statistics us
        WHERE language = '${getBoardDto.language}'
        order by user_id, date desc
    ) AS s ON (u.id = s.user_id)
    order by ${getBoardDto.sortBy} ${getBoardDto.sortOrder}
    `);

    const allItems = await queryBuilder;
    const count = allItems.length;

    const offset = (getBoardDto.page - 1) * getBoardDto.limit;
    const items = await this.query(`
    select u.id, u.username, u.name, u.rank, s.score 
    from users u
    left join (
        select distinct on (user_id) us.*
        from user_statistics us
        WHERE language = '${getBoardDto.language}'
        order by user_id, date desc
    ) AS s ON (u.id = s.user_id)
    order by ${getBoardDto.sortBy} ${getBoardDto.sortOrder}
    limit ${getBoardDto.limit}
    offset ${offset}
    `) as BoardStatistic[];

    return {
      items,
      meta: {
        itemCount: items.length,
        totalItems: count,
        itemsPerPage: getBoardDto.limit,
        totalPages: Math.floor(count / getBoardDto.limit),
        currentPage: getBoardDto.page,
      },
    };
  }

  public async getById(userId: number): Promise<User> {
    const user = await this.findById(userId);

    if (!user) {
      throw new NotFoundException(ErrorEnum.UserNotFound);
    }

    return user;
  }
}
