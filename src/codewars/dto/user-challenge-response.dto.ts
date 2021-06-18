import { UserChallengeItemResponseDto } from './user-challenge-item-response.dto';

export class UserChallengeResponseDto {
    public totalPages: number;

    public totalItems: number;

    public data: UserChallengeItemResponseDto[];
}

