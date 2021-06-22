import { ApiProperty } from '@nestjs/swagger';

import { LanguageEnum } from '../../utils/enums/language.enum';

export class UserStatisticResponse {
  @ApiProperty()
  public userId: number;

  @ApiProperty()
  public language: LanguageEnum;

  @ApiProperty()
  public score: number;

  @ApiProperty()
  public rank: number;

  @ApiProperty()
  public rankName: string;

  @ApiProperty()
  public rankColor: string;

  @ApiProperty()
  public date: Date;
}
