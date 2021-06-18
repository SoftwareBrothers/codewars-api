import * as faker from 'faker';

import { User } from '../../src/user/models/user.entity';

export const userFactory = async (
  user?: Partial<User>
): Promise<User> => {
  const username = faker.internet.userName();
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();

  return User.create({
    username,
    firstName,
    lastName,
    ...user,
  }).save();
};
