import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { typeOrmConfig } from './config/typeorm.config';
import { UserStatisticModule } from './user-statistic/user-statistic.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      // envFilePath: path.resolve(
      //   process.cwd(),
      //   isEnvironment(Environment.TEST) ? '.env.test' : '.env'
      // ),
      envFilePath: [
        '.env',
      ],
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(typeOrmConfig),
    UserModule,
    UserStatisticModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
