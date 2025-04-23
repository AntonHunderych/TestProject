import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne } from 'typeorm';
import { TodoEntity } from './TodoEntity';
import { CommentEntity } from './CommentEntity';
import { WorkSpaceUserEntity } from './WorkSpace/WorkSpaceUserEntity';
import { TagEntity } from './TagEntity';
import { CategoryEntity } from './CategoryEntity';
import { TokenEntity } from './TokenEntity';
import { UserRoleEntity } from './UserRoleEntity';
import { UserLimitsEntity } from './UserLimitsEntity';

@Entity({ name: 'user' })
export class UserEntity {
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

  @OneToMany(() => UserRoleEntity, (userRole) => userRole.user)
  roles: UserRoleEntity[];

  @OneToMany(() => TodoEntity, (todo) => todo.creator)
  todos: TodoEntity[];

  @OneToMany(() => CommentEntity, (comments) => comments.author)
  comments: CommentEntity[];

  @OneToMany(() => TagEntity, (tag) => tag.user)
  tags: TagEntity[];

  @OneToMany(() => CategoryEntity, (category) => category.user)
  categories: CategoryEntity[];

  @OneToMany(() => WorkSpaceUserEntity, (wsUser) => wsUser.user)
  wsUsers: WorkSpaceUserEntity[];

  @OneToOne(() => UserLimitsEntity, (userLimits) => userLimits.user)
  limits: UserLimitsEntity;
}
