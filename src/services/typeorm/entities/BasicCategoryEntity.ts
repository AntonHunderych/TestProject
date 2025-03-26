import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class BasicCategory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  value: string;

  @Column()
  description: string;
}
