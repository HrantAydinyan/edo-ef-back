import { AbstractEntity } from 'src/common';
import { Entity, Column } from 'typeorm';

@Entity('privacy_policies')
export class PrivacyPolicy extends AbstractEntity {
  @Column({ name: 'title' })
  title: string;

  @Column({ name: 'content', type: 'text' })
  content: string;
}
