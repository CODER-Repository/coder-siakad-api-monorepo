/* eslint-disable no-unused-vars */
import { BaseEntity, Column, Entity, PrimaryColumn, OneToMany, ManyToOne, JoinColumn, ManyToMany } from 'typeorm';
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
  day!: Day;

  @Column({ type: 'time' })
  start_time!: string;

  @Column({ type: 'time' })
  end_time!: string;

  @ManyToOne(() => Student, student => student.schedule)
  @JoinColumn({ name: 'nim' })
  student!: Student;

  @ManyToOne(() => Course, course => course.schedule)
  @JoinColumn({ name: 'course_id' })
  course!: Course;

  @ManyToOne(() => Lecturer, lecturer => lecturer.schedule)
  @JoinColumn({ name: 'lecturer_id' })
  lecturer!: Lecturer;

  @ManyToOne(() => Class, classEntity => classEntity.schedule)
  @JoinColumn({ name: 'class_id' })
  class!: Class;

  @ManyToOne(() => Semester, semester => semester.schedule)
  @JoinColumn({ name: 'semester_id' })
  semester!: Semester;
}
