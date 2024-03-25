import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity({ name: 'insurances' })
export class Insurance {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: true })
  logo: string;

  @Column({ default: () => 1 })
  rating: number;

  @Column({ type: 'datetime', default: () => Date.now(), nullable: false })
  createdAt: Date;

  @Column({ type: 'datetime', default: () => null, nullable: true })
  updatedAt: Date;

  @Column({ default: true })
  status: boolean;
}
