import { Column, Entity, JoinColumn, ManyToMany, ManyToOne } from 'typeorm';
import { User } from './UserEntity';
import { BasicTag } from './BasicTagEntity';
import { TodoTag } from './TodoTagEntity';

@Entity()
export class Tag extends BasicTag {
  @ManyToMany(() => TodoTag, (todo) => todo.tag)
  todos: TodoTag[];

  @Column()
  userId: string;

  @ManyToOne(() => User, (user) => user.tags)
  @JoinColumn({ name: 'userId' })
  user: User;
}
