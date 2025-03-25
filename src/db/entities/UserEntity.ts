import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany, OneToOne } from 'typeorm';
import { Role } from './RoleEntity';
import { Todo } from './TodoEntity';
import { Comment } from './CommentEntity';
import { WorkSpaceUser } from './WorkSpace/WorkSpaceUserEntity';
import { Tag } from './TagEntity';
import { Category } from './CategoryEntity';
import { TokenEntity } from './tokenEntity';

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

  @OneToOne(() => TokenEntity, (token) => token.user)
  token: TokenEntity;

  @ManyToMany(() => Role, (role) => role.users)
  @JoinTable()
  roles: Role[];

  @OneToMany(() => Todo, (todo) => todo.creator)
  todos: Todo[];

  @OneToMany(() => Comment, (comments) => comments.author)
  comments: Comment[];

  @OneToMany(() => Tag, (tag) => tag.user)
  tags: Tag[];

  @OneToMany(() => Category, (category) => category.user)
  categories: Category[];

  @OneToMany(() => WorkSpaceUser, (wsUser) => wsUser.user, { cascade: ['remove'] })
  wsUsers: WorkSpaceUser[];
}
