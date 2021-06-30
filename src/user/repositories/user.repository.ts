import { NotFoundException } from '@nestjs/common';
import moment from 'moment';
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

  public findByUsername(username: string): Promise<Nullable<User>> {
    return this.findOne({
      where: {
        username,
        deletedAt: IsNull(),
      },
    });
  }

  public getAll(): Promise<User[]> {
    return this.find({
      where: { deletedAt: IsNull() },
    });
  }

  public async getUsersWithStatisticsQueryBuilder(getBoardDto: GetBoardDto): Promise<Paginated<BoardStatistic>> {
    const dateFrom =  getBoardDto.dateFrom ? moment(getBoardDto.dateFrom).format('YYYY-MM-DD') : moment('2021-06-18').format('YYYY-MM-DD');
    const dateTo =  getBoardDto.dateTo ? moment(getBoardDto.dateTo).format('YYYY-MM-DD') : moment().format('YYYY-MM-DD');

    const queryBuilder = this.query(`
    select u.id, u.username, u.name, (sto.score - sfrom.score) as score, sto.rank, sto.rank_name as rankname, sto.rank_color as rankcolor
    from users u
    left join (
        select distinct on (user_id) us.*
        from user_statistics us
        WHERE language = '${getBoardDto.language}'
        AND date >= '${dateFrom}'
        order by user_id, date asc
    ) AS sfrom ON (u.id = sfrom.user_id)
    left join (
      select distinct on (user_id) us.*
      from user_statistics us
      WHERE language = '${getBoardDto.language}'
      AND date <= '${dateTo}'
      order by user_id, date desc
  ) AS sto ON (u.id = sto.user_id)
    order by ${getBoardDto.sortBy} ${getBoardDto.sortOrder}
    `);

    const allItems = await queryBuilder;
    const count = allItems.length;

    const offset = (getBoardDto.page - 1) * getBoardDto.limit;
    const items = await this.query(`
    select u.id, u.username, u.name, (sto.score - sfrom.score) as score, sto.rank, sto.rank_name as rankname, sto.rank_color as rankcolor
    from users u
    left join (
      select distinct on (user_id) us.*
      from user_statistics us
      WHERE language = '${getBoardDto.language}'
      AND date >= '${dateFrom}'
      order by user_id, date asc
    ) AS sfrom ON (u.id = sfrom.user_id)
    left join (
      select distinct on (user_id) us.*
      from user_statistics us
      WHERE language = '${getBoardDto.language}'
      AND date <= '${dateTo}'
      order by user_id, date desc
    ) AS sto ON (u.id = sto.user_id)
    WHERE sto.score IS NOT NULL
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
        totalPages: Math.floor(count / getBoardDto.limit) + 1,
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

  public async getByUsername(username: string): Promise<User> {
    const user = await this.findByUsername(username);

    if (!user) {
      throw new NotFoundException(ErrorEnum.UserNotFound);
    }

    return user;
  }

  public async updateUser(userId: number, data: Partial<User>): Promise<User> {
    const user = await this.getById(userId);

    Object.assign(user, data);

    return user.save();
  }
}
