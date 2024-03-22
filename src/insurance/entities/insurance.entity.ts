import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity({ name: 'insurances' })
export class Insurance {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  logo: string;

  @Column({ type: 'datetime', default: () => Date.now() })
  createdAt: Date;

  @Column({ default: true })
  status: boolean;
}
