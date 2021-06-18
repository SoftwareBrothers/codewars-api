import { ApiProperty } from '@nestjs/swagger';

export class PaginationMeta {
  @ApiProperty()
  public itemCount: number;

  @ApiProperty()
  public totalItems: number;

  @ApiProperty()
  public itemsPerPage: number;

  @ApiProperty()
  public totalPages: number;

  @ApiProperty()
  public currentPage: number;
}
