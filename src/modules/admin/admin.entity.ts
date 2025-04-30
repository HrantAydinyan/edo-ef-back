import { Entity, Column } from 'typeorm';
import { AbstractEntity } from '../../common';
import { Exclude } from 'class-transformer';

@Entity({ name: 'admins' })
export class Admin extends AbstractEntity {
  @Column({ nullable: false, type: 'varchar' })
  name!: string;

  @Column({ unique: true, nullable: false, type: 'varchar' })
  email!: string;

  @Column({ nullable: false, type: 'varchar' })
  @Exclude()
  password!: string;
}
