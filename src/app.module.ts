import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { database } from './config';
import { UserStatisticModule } from './user-statistic/user-statistic.module';
import { UserModule } from './user/user.module';
import { CodewarsModule } from './codewars/codewars.module';

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
      ],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => configService.get('database'),
    }),
    UserModule,
    UserStatisticModule,
    CodewarsModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
