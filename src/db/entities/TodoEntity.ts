import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany, ManyToMany } from 'typeorm';
import { User } from './UserEntity';
import { Comment } from './CommentEntity';
import { Tag } from './TagEntity';
import { Category } from './CategoryEntity';

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

  @ManyToMany(()=>Tag,(tag)=>tag.todos)
  tags: Tag[];

  @ManyToOne(() => Category, (category) => category.todos)
  category: Category;
}