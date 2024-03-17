/* eslint-disable no-unused-vars */
import { BaseEntity, Column, Entity, PrimaryColumn, OneToMany } from 'typeorm';
import { Schedule } from './schedule.entity';
import { Class } from '.';

export enum Gender {
    Male = 'male',
    Female = 'female',
  }

@Entity({ name: 'lecturer' })
export class Lecturer extends BaseEntity {
  @PrimaryColumn({ type: 'varchar', length: 10 })
  nip!: string;

  @Column({ type: 'uuid' })
  user_id!: string;

  @Column({ type: 'varchar', length: 30 })
  name!: string;

  @Column({ type: 'enum', enum: Gender, default: Gender.Male })
  type!: Gender;

  @Column({ type: 'varchar', length: 14 })
  phone_number!: string;

  @Column({ type: 'varchar', length: 30 })
  email!: string;

  @OneToMany(() => Schedule, schedule => schedule.lecturer_id)
  schedule!: Schedule;

  @OneToMany(() => Class, classEntity => classEntity.lecturer_id)
  class!: Class;
}
