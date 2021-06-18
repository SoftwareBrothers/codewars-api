import * as faker from 'faker';

import { User } from '../../src/user/models/user.entity';

export const userFactory = async (
  user?: Partial<User>
): Promise<User> => {
  const username = faker.internet.userName();
  const name = `${faker.name.firstName()} ${faker.name.lastName()}`;
  
  return User.create({
    username,
    name,
    ...user,
  }).save();
};
