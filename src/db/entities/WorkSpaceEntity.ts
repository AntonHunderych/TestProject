import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { WorkSpaceUser } from './WorkSpaceUser';
import { WorkSpaceTodo } from './WorkSpaceTodo';

@Entity()
@Unique(['name', 'creatorId'])
export class WorkSpace {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  creatorId: string;

  @OneToMany(() => WorkSpaceTodo, (workSpaceEntity) => workSpaceEntity.workSpace)
  wsTodos: WorkSpaceTodo[];

  @OneToMany(() => WorkSpaceUser, (wsUser) => wsUser.workSpace)
  wsUsers: WorkSpaceUser[];
}
