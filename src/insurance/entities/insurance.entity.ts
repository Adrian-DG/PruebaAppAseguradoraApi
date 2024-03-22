import { ApiProperty } from '@nestjs/swagger';
import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity({ name: 'insurances' })
export class Insurance {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'Insurance Identifier', nullable: false })
  id: number;

  @Column({ nullable: false })
  @ApiProperty({ description: 'Insurance policy name', nullable: false })
  name: string;

  @Column({ nullable: true })
  @ApiProperty({ description: 'Insurance logo image', nullable: true })
  logo: string;

  @Column({ default: () => 1 })
  @ApiProperty({ description: 'Insurance rating', nullable: false })
  rating: number;

  @Column({ type: 'datetime', default: () => Date.now(), nullable: false })
  @ApiProperty({ description: 'Insurance creation date', nullable: false })
  createdAt: Date;

  @Column({ type: 'datetime', default: () => null, nullable: true })
  @ApiProperty({ description: 'Insurance update date', nullable: false })
  updatedAt: Date;

  @Column({ default: true })
  @ApiProperty({ description: 'Insurance status', nullable: false })
  status: boolean;
}
