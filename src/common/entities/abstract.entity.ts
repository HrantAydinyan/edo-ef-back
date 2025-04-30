import { PrimaryGeneratedColumn } from 'typeorm';
import { TimestampEntity } from './timestamp.entity';

export abstract class AbstractEntity extends TimestampEntity {
  @PrimaryGeneratedColumn()
  id: number;
}
