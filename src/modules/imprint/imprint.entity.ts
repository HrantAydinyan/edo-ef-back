import { AbstractEntity } from 'src/common';
import { Entity, Column } from 'typeorm';

@Entity('imprint')
export class Imprint extends AbstractEntity {
  @Column({ name: 'title' })
  title: string;

  @Column({ name: 'content', type: 'text' })
  content: string;
}
