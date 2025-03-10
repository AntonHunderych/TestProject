import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { Role } from './RoleEntity';
import { Todo } from './TodoEntity';
import { Comment } from './CommentEntity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @ManyToMany(() => Role, (role) => role.users)
  @JoinTable()
  roles: Role[];

  @OneToMany(() => Todo, (todo)=>todo.creator)
  todos: Todo[]

  @OneToMany(() => Comment, (comments)=>comments.author)
  comments: Comment[];

}
