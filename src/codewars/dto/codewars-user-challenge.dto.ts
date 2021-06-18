import { LanguageEnum as CodewarsLanguageEnum } from '../enums/language.enum';
import { LanguageEnum } from '../../utils/enums/language.enum';

export class CodewarsUserChallengeDto {
    public id: string;

    public name: string;

    public description: string;

    public rank: number;

    public rankName: string;

    public rankColor: string;

    public languages: CodewarsLanguageEnum[];

    public completedLanguages: LanguageEnum[];

    public date: Date;

    public url: string;

    public category: string;

    public slug: string;
}
