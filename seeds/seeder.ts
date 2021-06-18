import { config as readEnvs } from 'dotenv';
import { createConnection } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

import { userFactory } from './factories/user.factory';
import { User } from '../src/user/models/user.entity';

readEnvs();

const seedUsers = async (): Promise<User[]> => {
  const usernames = [
  'pawlakzn',
  'dziraf',
  'JonaszJestem',
  'Co0sh',
  'Andrianka',
  'Bydziek',
  'szrama',
  ];

  return Promise.all(
    usernames.map((username) => userFactory({ username }))
  );
};

const connectToDatabase = async () => {
  const {
    POSTGRES_HOST = '',
    POSTGRES_PORT = '',
    POSTGRES_USER = '',
    POSTGRES_PASSWORD = '',
    POSTGRES_DB = '',
  } = process.env;

  await createConnection({
    type: 'postgres',
    host: POSTGRES_HOST,
    port: parseInt(POSTGRES_PORT, 10),
    username: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    database: POSTGRES_DB,
    entities: [`${__dirname}/../src/**/*.entity{.js,.ts}`],
    namingStrategy: new SnakeNamingStrategy(),
  });

  await Promise.all(
    [User].map((Entity) => Entity.delete({}))
  );
};

const seed = async () => {
  await connectToDatabase();

  const users = await seedUsers();
};

seed();
