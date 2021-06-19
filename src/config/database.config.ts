import { registerAs } from '@nestjs/config';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

import { Challenge } from '../user-challenge/models/challenge.entity';
import { UserChallenge } from '../user-challenge/models/user-challenge.entity';
import { UserStatistic } from '../user-statistic/models/user-statistic.entity';
import { User } from '../user/models/user.entity';

const entities = process.env.SERVERLESS_MODE === 'true'
  ? [
    Challenge,
    User,
    UserChallenge,
    UserStatistic,
  ]
  : [`${__dirname}/../**/*.entity{.ts,.js}`];

export default registerAs('database', () => ({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: process.env.POSTGRES_AUTOSYNC === '1',
  migrationsTableName: 'migrations',
  migrationsTransactionMode: 'each',
  keepConnectionAlive: true,
  entities,
  namingStrategy: new SnakeNamingStrategy(),
}));
