import { BaseEntity, Column, Entity, PrimaryColumn, ManyToOne } from 'typeorm';
import { Schedule } from './schedule.entity';

@Entity({ name: 'student' })
export class Student extends BaseEntity {
  @PrimaryColumn({ type: 'varchar', length: 30 })
  nim!: string;

  @Column({ type: 'varchar', length: 100 })
  email!: string;

  @Column({ type: 'varchar', length: 100 })
  full_name!: string;

  @Column({ type: 'varchar', length: 30 })
  major_id!: string;

  @Column({ type: 'date' })
  entry_year!: Date;

  @Column({ type: 'date' })
  birth_date!: Date;

  @Column({ type: 'varchar', length: 10 })
  address_id!: string;

  @Column({ type: 'varchar', length: 15 })
  phone_number!: string;

  @Column({ type: 'uuid' })
  user_id!: string;

  @ManyToOne(() => Schedule, schedule => schedule.schedule_id)
  schedule!: Schedule;
}
