import { IsDate, IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

import { CursorQuery, Nullable } from '../../utils/types';
import { LanguageEnum } from '../../codewars/enums/language.enum';
import { BoardSortEnum } from '../../codewars/enums/board-sort.enum';
import { SortOrderEnum } from '../../utils/enums/sort-order.enum';

export class GetBoardDto extends CursorQuery {
  @IsNotEmpty()
  @IsEnum(LanguageEnum)
  @ApiProperty({ enum: Object.values(LanguageEnum) })
  public language: LanguageEnum;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  @ApiProperty({ example: '2020-01-01', required: false })
  public dateFrom: Nullable<Date>;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  @ApiProperty({ example: '2020-01-01', required: false })
  public dateTo: Nullable<Date>;

  @IsOptional()
  @IsNotEmpty()
  @IsEnum(BoardSortEnum)
  @ApiProperty({ required: false, enum: Object.values(BoardSortEnum) })
  public sortBy: BoardSortEnum = BoardSortEnum.Score;

  @IsOptional()
  @IsNotEmpty()
  @IsEnum(SortOrderEnum)
  @ApiProperty({ required: false, enum: Object.values(SortOrderEnum) })
  public sortOrder: SortOrderEnum = SortOrderEnum.DESC;
}
