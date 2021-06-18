import { LanguageEnum } from '../../utils/enums/language.enum';

export class CodewarsUserDto {
    public username: string;

    public name: string;

    public honor: number;

    public clan: string | null;

    public leaderboardPosition: number | null;

    public statistics: {
        language: LanguageEnum,
        score: number,
        rank: number,
        rankName: string,
        rankColor: string,

    }[]

    public codeChallenges: {
        'totalAuthored': number,
        'totalCompleted': number
    }
}

