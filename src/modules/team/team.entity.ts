import { AbstractEntity } from 'src/common';
import { Entity, Column } from 'typeorm';

@Entity('team')
export class TeamSection extends AbstractEntity {
  @Column({ name: 'full_name' })
  fullName: string;

  @Column({ name: 'position', type: 'varchar' })
  position: string;

  @Column({ name: 'file_path', nullable: true })
  filePath: string;

  @Column({ name: 'file_path_type', nullable: true })
  filePathType: string;
}
