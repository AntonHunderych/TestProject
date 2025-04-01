import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { UserEntity } from './UserEntity';
import { BasicTagEntity } from './BasicTagEntity';
import { TodoTagEntity } from './TodoTagEntity';

@Entity({ name: 'tag' })
export class TagEntity extends BasicTagEntity {
  @OneToMany(() => TodoTagEntity, (todo) => todo.tag)
  todos: TodoTagEntity[];

  @Column()
  userId: string;

  @ManyToOne(() => UserEntity, (user) => user.tags, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: UserEntity;
}
