/* eslint-disable no-unused-vars */
import { BaseEntity, Column, Entity, PrimaryColumn, OneToMany, OneToOne, ManyToOne } from 'typeorm';
import { Student } from './student.entity';
import { Course } from './course.entity';
import { Semester } from './semester.entity';
import { Lecturer } from './lecture.entity';
import { Class } from './class.entity';

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
  @PrimaryColumn({ type: 'varchar', length: 20 })
  schedule_id!: string;

  @Column({ type:'varchar', length: 15 })
  lecturer_id!: string;

  @Column({ type:'varchar', length: 30 })
  nim!: string;

  @Column({ type:'varchar', length: 15 })
  course_id!: string;

  @Column({ type:'varchar', length: 15 })
  class_id!: string;

  @Column({ type:'varchar', length: 5 })
  semester_id!: string;

  @Column({ type: 'enum', enum: Day, default: Day.Sunday })
  type!: Day;

  @Column({ type: 'time' })
  start_time!: string;

  @Column({ type: 'time' })
  end_time!: string;

  @OneToMany(() => Student, student => student.nim)
  student!: Student;

  @ManyToOne(() => Course, course => course.course_id)
  course!: Course;

  @ManyToOne(() => Semester, semester => semester.semester_id)
  semester!: Semester;

  @ManyToOne(() => Lecturer, lecturer => lecturer.lecturer_id)
  lecturer!: Lecturer;

  @OneToOne(() => Class, classEntity => classEntity.class_id)
  class!: Class;
}
