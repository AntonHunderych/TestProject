import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class BasicCategoryEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  value: string;

  @Column({ nullable: true })
  description: string;
}
