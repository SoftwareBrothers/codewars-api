import { LanguageEnum } from '../enums/language.enum';

import { RawRankDto } from './raw-rank.dto';
import { ChallengeUserDto } from './challenge-user.dto';

export class ChallengeResponseDto {
    public id: string;

    public name: string;

    public slug: string;

    public category: string

    public publishedAt: string;

    public approvedAt: string;

    public languages: LanguageEnum[];

    public url: string;

    public rank: RawRankDto;

    public createdAt: string;

    public createdBy: ChallengeUserDto;

    public approvedBy: ChallengeUserDto;

    public description: string;

    public totalAttempts: number;

    public totalCompleted: number;

    public totalStars: number;

    public voteScore: number;

    public tags: string[];

    public contributorsWanted: boolean;

    public unresolved: {
        issues: 1;
        suggestions: 1;
    }
}
