import { ApiProperty } from '@nestjs/swagger';

export class UserResponse {
  @ApiProperty()
  public id: number;

  @ApiProperty()
  public username: string;

  @ApiProperty()
  public firstName: string;

  @ApiProperty()
  public lastName: string;

  @ApiProperty()
  public createdAt: Date;

  @ApiProperty()
  public updatedAt: Date;
}
