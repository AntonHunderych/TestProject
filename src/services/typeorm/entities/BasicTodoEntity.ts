import { Column, CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

export class BasicTodoEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ type: 'varchar', nullable: true })
  description?: string | null;

  @Column({ type: 'timestamp', nullable: true })
  eliminatedDate?: Date | null;

  @Column({ type: 'integer', nullable: true })
  importance?: number | null;

  @Column({ type: 'boolean', nullable: true })
  completed: boolean;

  @Column({ name: 'creatorId', type: 'varchar', nullable: true })
  creatorId: string | null;

  @CreateDateColumn()
  createdAt: Date;
}
