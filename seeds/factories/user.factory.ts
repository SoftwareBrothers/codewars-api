import * as faker from 'faker';

import { User } from '../../src/user/models/user.entity';

export const userFactory = async (
  user?: Partial<User>
): Promise<User> => {
  const username = faker.internet.userName();
  const name = `${faker.name.firstName()} ${faker.name.lastName()}`;
  const rank = Math.floor(Math.random() * 10);
  
  return User.create({
    username,
    name,
    rank: `${rank} kyu`,
    ...user,
  }).save();
};
