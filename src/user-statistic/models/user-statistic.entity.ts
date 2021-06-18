import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { LanguageEnum } from '../../codewars/enums/language.enum';
import { User } from '../../user/models/user.entity';

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
  public language: string;

  @Column()
  public score: number;

  @Column({ type: 'timestamp' })
  public date: Date;
}
