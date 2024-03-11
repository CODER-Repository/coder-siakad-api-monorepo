/* eslint-disable no-unused-vars */
import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

export enum Day {
  Sunday = 'sunday',
  Monday = 'monday',
  Tuesday = 'tuesday',
  Wednesday = 'wednesday',
  Thursday = 'thursday',
  Friday = 'friday',
  Saturday = 'saturday'
}

@Entity({ name: 'schedule' })
export class Schedule extends BaseEntity {
  @PrimaryColumn({ name: 'schedule_id', length: 20 })
  schedule_id!: string;

  @Column({ name: 'lecturer_id', length: 15 })
  lecturer_id!: string;

  @Column({ name: 'nim', length: 30 })
  nim!: string;

  @Column({ name: 'course_id', length: 15 })
  course_id!: string;

  @Column({ name: 'class_id', length: 15 })
  class_id!: string;

  @Column({ name: 'semester_id', length: 5 })
  semester_id!: string;

  @Column({ type: 'enum', enum: Day, default: Day.Sunday })
  type!: Day;

  @Column({ name: 'start_time', type: 'time' })
  start_time!: string;

  @Column({ name: 'end_time', type: 'time' })
  end_time!: string;
}
