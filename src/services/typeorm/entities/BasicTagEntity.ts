import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class BasicTag {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  value: string;
}
