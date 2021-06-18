import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { BoardModule } from './board/board.module';
import { database, codewars } from './config';
import { UserStatisticModule } from './user-statistic/user-statistic.module';
import { UserModule } from './user/user.module';
import { CodewarsModule } from './codewars/codewars.module';
import { UserChallengeModule } from './user-challenge/user-challenge.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [
        `.env.${process.env.NODE_ENV}.local`,
        `.env.${process.env.NODE_ENV}`,
        '.env.local',
        '.env',
      ],
      load:  [
        database,
        codewars,
      ],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => configService.get('database'),
    }),
    BoardModule,
    UserModule,
    UserStatisticModule,
    UserChallengeModule,
    CodewarsModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
