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

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ unique: true, nullable: false })
  public username: string;

  @Column({ nullable: true })
  public firstName: string;

  @Column({ nullable: true })
  public lastName: string;

  @CreateDateColumn({ name: 'created_at' })
  public createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  public updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  public deletedAt: Date;

  @OneToMany(() => UserStatistic, (userStatistic) => userStatistic.user, { onDelete: 'CASCADE' })
  public statistics: UserStatistic[];
}
