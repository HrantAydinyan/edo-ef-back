import { AbstractEntity } from 'src/common';
import { Entity, Column } from 'typeorm';

@Entity('bloggers')
export class BloggersSection extends AbstractEntity {
  @Column({ name: 'full_name', type: 'varchar' })
  fullName: string;

  @Column({ name: 'status', type: 'varchar' })
  status: string;

  @Column({ name: 'file_path', nullable: true })
  filePath: string;

  @Column({ name: 'file_path_type', nullable: true })
  filePathType: string;
}
