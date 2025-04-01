import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class BasicTodoEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ nullable: true })
  eliminatedDate?: Date;

  @Column({ nullable: true })
  importance?: number;

  @Column({ nullable: true })
  status?: string;

  @Column({ name: 'creatorId' })
  creatorId: string;
}
