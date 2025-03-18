import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { User } from './UserEntity';
import { Comment } from './CommentEntity';

export class BasicTodo {
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

@Entity()
export class Todo extends BasicTodo {
  @ManyToOne(() => User, (user) => user.todos)
  @JoinColumn({ name: 'creatorId' })
  creator: User;

  @OneToMany(() => Comment, (comment) => comment.todo)
  comments: Comment[];
}
