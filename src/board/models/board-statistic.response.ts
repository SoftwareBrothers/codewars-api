import { ApiProperty } from '@nestjs/swagger';

export class BoardStatisticResponse
{
  @ApiProperty()
  public id: number;

  @ApiProperty()
  public rank: string;

  @ApiProperty()
  public username: string;

  @ApiProperty()
  public name: string;

  @ApiProperty()
  public score: number;
}
