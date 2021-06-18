import { ApiProperty } from '@nestjs/swagger';

export class UserResponse {
  @ApiProperty()
  public id: number;

  @ApiProperty()
  public username: string;

  @ApiProperty()
  public name: string;

  @ApiProperty()
  public rank: string;

  @ApiProperty()
  public honor: number;

  @ApiProperty()
  public createdAt: Date;

  @ApiProperty()
  public updatedAt: Date;
}
