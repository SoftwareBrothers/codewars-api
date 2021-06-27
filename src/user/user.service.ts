import { Injectable } from '@nestjs/common';

import { CodewarsUserDto } from '../codewars/dto/codewars-user.dto';

import { User } from './models/user.entity';
import { UserRepository } from './repositories/user.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
  ) {}

  public getUser(userId: number): Promise<User> {
    return this.userRepository.getById(userId);
  }

  public getUserByUsername(username: string): Promise<User> {
    return this.userRepository.getByUsername(username);
  }

  public getAllUsers(): Promise<User[]> {
    return this.userRepository.getAll();
  }

  public updateUserGlobalStatistics(user: User, data: CodewarsUserDto): Promise<User> {
    return this.userRepository.updateUser(user.id, {
      honor: data.honor,
      clan: data.clan,
      name: data.name,
      leaderboardPosition: data.leaderboardPosition,
    });
  }
}
