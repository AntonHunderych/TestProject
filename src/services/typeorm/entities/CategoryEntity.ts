import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { TodoEntity } from './TodoEntity';
import { UserEntity } from './UserEntity';
import { BasicCategoryEntity } from './BasicCategoryEntity';

@Entity({ name: 'category' })
export class CategoryEntity extends BasicCategoryEntity {
  @OneToMany(() => TodoEntity, (todo) => todo.category)
  todos: TodoEntity[];

  @Column()
  userId: string;

  @ManyToOne(() => UserEntity, (user) => user.tags, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: UserEntity;
}
