import { Injectable } from '@nestjs/common';

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

  public getAllUsers(): Promise<User[]> {
    return this.userRepository.getAll();
  }
}
