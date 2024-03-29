import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiNotFoundResponse } from '@nestjs/swagger';

import { UserResponse } from './models/user.response';
import { UserTransformer } from './transformers/user.transformer';
import { UserService } from './user.service';

@Controller('users')
@ApiTags('Users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly userTransformer: UserTransformer
  ) {}

  @Get(':userId')
  @ApiOkResponse({ type: UserResponse })
  @ApiNotFoundResponse()
  public async getUser(@Param('userId') userId: number): Promise<UserResponse> {
    const user = await this.userService.getUser(userId);

    return this.userTransformer.transform(user);
  }

  @Get('username/:username')
  @ApiOkResponse({ type: UserResponse })
  @ApiNotFoundResponse()
  public async getUserByUsername(@Param('username') username: string): Promise<UserResponse> {
    const user = await this.userService.getUserByUsername(username);

    return this.userTransformer.transform(user);
  }
}
