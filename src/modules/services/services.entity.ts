import { AbstractEntity } from 'src/common';
import { Entity, Column } from 'typeorm';

@Entity('services')
export class ServicesSection extends AbstractEntity {
  @Column({ name: 'title' })
  title: string;

  @Column({ name: 'short_description', type: 'varchar' })
  shortDescription: string;

  @Column({ name: 'description', type: 'text' })
  description: string;

  @Column({ name: 'file_path', nullable: true })
  filePath: string;

  @Column({ name: 'file_path_type', nullable: true })
  filePathType: string;
}
