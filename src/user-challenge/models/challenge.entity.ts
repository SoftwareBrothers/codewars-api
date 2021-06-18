import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'challenges' })
export class Challenge extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ name: 'external_id' })
  public externalId: string;

  @Column()
  public name: string;

  @Column()
  public description: string;

  @Column()
  public url: string;

  @Column()
  public category: string;

  @Column()
  public slug: string;

  @Column()
  public rank: number;

  @Column({ name: 'rank_name' })
  public rankName: string;

  @Column({ name: 'rank_color' })
  public rankColor: string;

  @Column('text', { array: true })
  public languages: string[];
}
