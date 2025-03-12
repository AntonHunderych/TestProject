import { Column, CreateDateColumn, Entity, JoinTable, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { User } from './UserEntity';
import { Todo } from './TodoEntity';

@Entity()
export class Comment {

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  text: string;

  @Column({name: 'authorId'})
  authorId: string;

  @Column({name: 'todoId'})
  todoId: string

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.comments)
  @JoinTable({name: 'authorId'})
  author: User;

  @ManyToOne(()=> Todo, (todo) => todo.comments)
  @JoinTable({name:"todoId"})
  todo: Todo
}