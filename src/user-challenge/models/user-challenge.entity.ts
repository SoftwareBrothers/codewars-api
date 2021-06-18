import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { User } from '../../user/models/user.entity';

import { Challenge } from './challenge.entity';

@Entity({ name: 'user_challenges' })
export class UserChallenge extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ name: 'user_id' })
  public userId: number;

  @ManyToOne(() => User, (user) => user.challenges, {
    eager: false,
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  public user: User;

  @Column({ name: 'challenge_id' })
  public challengeId: number;

  @ManyToOne(() => Challenge, {
    eager: false,
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'challenge_id' })
  public challenge: Challenge;

  @Column({ type: 'timestamp', nullable: false })
  public date: Date;

  @Column('text', { array: true })
  public languages: string[];
}
