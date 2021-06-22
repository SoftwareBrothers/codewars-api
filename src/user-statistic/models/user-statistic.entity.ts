import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { User } from '../../user/models/user.entity';
import { LanguageEnum } from '../../utils/enums/language.enum';

@Entity({ name: 'user_statistics' })
export class UserStatistic extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ name: 'user_id' })
  public userId: number;

  @ManyToOne(() => User, (user) => user.statistics, {
    eager: false,
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  public user: User;

  @Column({
    type: 'enum',
    enum: LanguageEnum,
  })
  public language: LanguageEnum;

  @Column()
  public score: number;

  @Column()
  public rank: number;

  @Column()
  public rankName: string;

  @Column()
  public rankColor: string;

  @Column({ type: 'date' })
  public date: Date;
}
