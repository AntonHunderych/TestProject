import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class BasicTagEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  value: string;
}
