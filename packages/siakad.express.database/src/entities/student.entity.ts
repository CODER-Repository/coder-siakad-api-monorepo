import { BaseEntity, Column, Entity, PrimaryColumn, OneToMany } from 'typeorm';
import { Schedule } from './schedule.entity';
import { KRS } from './krs.entity';

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

  @OneToMany(() => Schedule, schedule => schedule.nim)
  schedule!: Schedule;

  @OneToMany(() => KRS, krs => krs.nim)
  krs!: KRS;
}
