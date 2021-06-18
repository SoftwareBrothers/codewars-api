/* eslint-disable no-console */
import { Handler } from 'aws-lambda';
import { NestFactory } from '@nestjs/core';

import { UserService } from '../user/user.service';
import { CodewarsService } from '../codewars/codewars.service';
import { UserStatisticService } from '../user-statistic/user-statistic.service';
import { CodewarsUserDto } from '../codewars/dto/codewars-user.dto';
import { AppModule } from '../app.module';
import { User } from '../user/models/user.entity';

export const handler: Handler = async (): Promise<void> => {
  const app = await NestFactory.createApplicationContext(AppModule);
  const userService: UserService = app.get(UserService);
  const codewarsService: CodewarsService = app.get(CodewarsService);
  const userStatisticService: UserStatisticService = app.get(UserStatisticService);

  const users = await userService.getAllUsers();
  const promises = users.map((user: User) => codewarsService.getUserData(user.username)
    .then((data: CodewarsUserDto) => userStatisticService.persistCodewarsUserStatistics(user, data)));

  await Promise.all(promises);
};

if (process.env.LOCAL === 'true') {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  handler().then(() => {
    console.info('All users imported');
  });
}
