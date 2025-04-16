import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { WorkSpaceEntity } from './WorkSpaceEntity';
import { WorkSpaceUserEntity } from './WorkSpaceUserEntity';

@Entity({ name: 'workSpaceFile' })
export class WorkSpaceFileEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  originalName: string;

  @Column()
  fileType: string;

  @Column({ default: 'pending' })
  status: 'pending' | 'uploaded';

  @Column()
  workSpaceId: string;

  @ManyToOne(() => WorkSpaceEntity, (workSpace) => workSpace.files, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'workSpaceId', referencedColumnName: 'id' })
  workSpace: WorkSpaceEntity;

  @Column({ nullable: true })
  uploadById: string;

  @ManyToOne(() => WorkSpaceUserEntity, (workSpaceUser) => workSpaceUser.uploadedFiles, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'uploadById', referencedColumnName: 'id' })
  uploadBy: WorkSpaceUserEntity;
}
