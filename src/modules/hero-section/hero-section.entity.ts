import { AbstractEntity } from 'src/common';
import { Entity, Column } from 'typeorm';

@Entity('hero_section')
export class HeroSection extends AbstractEntity {
  @Column({ name: 'title' })
  title: string;

  @Column({ name: 'content', type: 'text' })
  content: string;
}
