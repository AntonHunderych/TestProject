import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { WorkSpaceUserEntity } from './WorkSpaceUserEntity';
import { WorkSpaceEntity } from './WorkSpaceEntity';
import { BasicCategoryEntity } from '../BasicCategoryEntity';
import { WorkSpaceTodoCategoryEntity } from './WorkSpaceTodoCategoryEntity';

@Entity({ name: 'workSpaceCategory' })
export class WorkSpaceCategoryEntity extends BasicCategoryEntity {
  @OneToMany(() => WorkSpaceTodoCategoryEntity, (workSpaceCategoryTodo) => workSpaceCategoryTodo.todos)
  todos: WorkSpaceTodoCategoryEntity[];

  @Column()
  creatorId: string;

  @ManyToOne(() => WorkSpaceUserEntity, (workSpaceUser) => workSpaceUser.createdTags)
  @JoinColumn([
    { name: 'creatorId', referencedColumnName: 'userId' },
    {
      name: 'workSpaceId',
      referencedColumnName: 'workSpaceId',
    },
  ])
  creator: WorkSpaceUserEntity;

  @Column()
  workSpaceId: string;

  @ManyToOne(() => WorkSpaceEntity, (workSpace) => workSpace.tags)
  @JoinColumn({ name: 'workSpaceId' })
  workSpace: WorkSpaceEntity;
}
