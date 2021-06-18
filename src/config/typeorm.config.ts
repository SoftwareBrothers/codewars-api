/* eslint-disable
 @typescript-eslint/no-unsafe-call,
 @typescript-eslint/no-unsafe-assignment,
*/

import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

import Environment, { isEnvironment } from './environment';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  migrations: ['dist/database/migrations/**/*.js'],
  cli: {
    migrationsDir: 'src/database/migrations',
  },
  entities: [`${__dirname}/../**/*.entity{.ts,.js}`],
  host: process.env.POSTGRES_HOST,
  port: +process.env.POSTGRES_PORT,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: process.env.POSTGRES_SYNCHRONIZE === 'true',
  migrationsRun: !isEnvironment(Environment.TEST),
  migrationsTableName: 'migrations',
  migrationsTransactionMode: 'each',
  keepConnectionAlive: true,
  logging: process.env.POSTGRES_LOGGING === 'true',
  namingStrategy: new SnakeNamingStrategy(),
};

export default typeOrmConfig;
