import { ApiProperty } from '@nestjs/swagger';

export class UserResponse {
  @ApiProperty()
  public id: number;

  @ApiProperty()
  public username: string;

  @ApiProperty()
  public name: string;

  @ApiProperty()
  public honor: number;

  @ApiProperty()
  public clan: string;

  @ApiProperty()
  public leaderboardPosition: number;

  @ApiProperty()
  public createdAt: Date;

  @ApiProperty()
  public updatedAt: Date;
}
