import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { UserStatistic } from '../../user-statistic/models/user-statistic.entity';
import { UserChallenge } from '../../user-challenge/models/user-challenge.entity';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ unique: true, nullable: false })
  public username: string;

  @Column({ nullable: true })
  public name: string;

  @Column({ nullable: true })
  public rank: string;

  @Column({ nullable: true })
  public honor: number;

  @Column({ nullable: true })
  public clan: string;

  @Column({ name: 'leaderboard_position', nullable: true })
  public leaderboardPosition: number;

  @CreateDateColumn({ name: 'created_at' })
  public createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  public updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  public deletedAt: Date;

  @OneToMany(() => UserStatistic, (userStatistic) => userStatistic.user, { onDelete: 'CASCADE' })
  public statistics: UserStatistic[];

  @OneToMany(() => UserChallenge, (userChallenge) => userChallenge.user, { onDelete: 'CASCADE' })
  public challenges: UserChallenge[];
}
