import { ApiProperty } from '@nestjs/swagger';

export class BoardStatisticResponse
{
  @ApiProperty()
  public rank: string;

  @ApiProperty()
  public name: string;

  @ApiProperty()
  public score: number;
}
