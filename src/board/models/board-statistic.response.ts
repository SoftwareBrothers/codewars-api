import { ApiProperty } from '@nestjs/swagger';

import { PaginationMeta } from '../../utils/models/pagination-meta.response';

export class BoardStatisticResponse
{
  @ApiProperty()
  public id: number;

  @ApiProperty()
  public username: string;

  @ApiProperty()
  public name: string;

  @ApiProperty()
  public score: number;

  @ApiProperty()
  public rank: number;

  @ApiProperty()
  public rankName: string;

  @ApiProperty()
  public rankColor: string;
}

export class PaginatedBoardStatisticResponse
{
  @ApiProperty({ isArray: true, type: BoardStatisticResponse })
  public items: BoardStatisticResponse[];

  @ApiProperty()
  public meta: PaginationMeta;
}
