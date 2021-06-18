import { ApiProperty } from '@nestjs/swagger';

export class UserChallengeResponse {
  @ApiProperty()
  public externalId: string;

  @ApiProperty()
  public rankName: string;

  @ApiProperty()
  public rankColor: string;

  @ApiProperty()
  public name: string;

  @ApiProperty()
  public description: string;

  @ApiProperty()
  public url: string;

  @ApiProperty()
  public completedLanguages: string[];

  @ApiProperty()
  public completedDate: Date;
}
