import { Column, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column({ type: 'varchar', nullable: true })
  status?: string | null;

  @Column({ name: 'creatorId' })
  creatorId: string;
}
