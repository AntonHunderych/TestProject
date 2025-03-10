import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { User } from './UserEntity';
import { Comment } from './CommentEntity';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({nullable: true})
  description?: string;

  @Column({ nullable: true})
  eliminatedDate?: Date;

  @Column({nullable: true})
  importance?: number;

  @Column({name: "creator_Id"})
  creatorId: string;

  @ManyToOne(() => User, (user) => user.todos)
  @JoinColumn({ name: 'creator_Id' })
  creator: User;

  @OneToMany(()=> Comment,(comment)=>comment.todo)
  comments: Comment[];
}
