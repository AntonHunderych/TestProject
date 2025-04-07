import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { WorkSpaceUserEntity } from './WorkSpaceUserEntity';
import { WorkSpaceEntity } from './WorkSpaceEntity';
import { BasicCategoryEntity } from '../BasicCategoryEntity';
import { WorkSpaceTodoEntity } from './WorkSpaceTodoEntity';

@Entity({ name: 'workSpaceCategory' })
export class WorkSpaceCategoryEntity extends BasicCategoryEntity {
  @OneToMany(() => WorkSpaceTodoEntity, (workSpaceTodoEntity) => workSpaceTodoEntity.category)
  todos: WorkSpaceTodoEntity[];

  @Column()
  creatorId: string;

  @ManyToOne(() => WorkSpaceUserEntity, (workSpaceUser) => workSpaceUser.createdTags, { onDelete: 'CASCADE' })
  @JoinColumn([{ name: 'creatorId', referencedColumnName: 'id' }])
  creator: WorkSpaceUserEntity;

  @Column()
  workSpaceId: string;

  @ManyToOne(() => WorkSpaceEntity, (workSpace) => workSpace.categories, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'workSpaceId' })
  workSpace: WorkSpaceEntity;
}
