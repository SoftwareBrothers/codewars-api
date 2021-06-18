import { registerAs } from '@nestjs/config';

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
  entities: [`${__dirname}/../**/*.entity{.ts,.js}`],
}));
