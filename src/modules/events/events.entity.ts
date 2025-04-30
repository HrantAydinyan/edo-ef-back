import { AbstractEntity } from 'src/common';
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BloggersSection } from '../bloggers/bloggers.entity';

@Entity('events')
export class EventsSection extends AbstractEntity {
  @Column({ name: 'title' })
  title: string;

  @Column({ name: 'label', type: 'varchar' })
  label: string;

  @Column({ name: 'status', type: 'varchar' })
  status: string;

  @Column({ name: 'description', type: 'text' })
  description: string;

  @Column({ name: 'file_path', nullable: true })
  filePath: string;

  @Column({ name: 'file_path_type', nullable: true })
  filePathType: string;

  @ManyToOne(() => BloggersSection, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'blogger_id' })
  blogger?: BloggersSection;
}
