import { LanguageEnum } from '../enums/language.enum';

import { RankDto } from './rank.dto';

export class UserResponseDto {
    public username: string;

    public name: string;

    public honor: number;

    public clan: string | null;

    public leaderboardPosition: number | null;

    public skills: string[] | null;

    public ranks: {
        'overall': RankDto,
        'languages': Record<LanguageEnum, RankDto>
    };

    public codeChallenges: {
        'totalAuthored': number,
        'totalCompleted': number
    }
}

