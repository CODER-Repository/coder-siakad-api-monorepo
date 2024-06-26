import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { Lecturer } from './lecture.entity';
import { Schedule } from './schedule.entity';
import { Classroom, Course, Semester } from '.';

@Entity({ name: 'class' })
export class Class extends BaseEntity {
    @PrimaryColumn({ type: 'varchar', length: 15 })
    class_id!: string;

    @Column({ type: 'varchar', length: 15 })
    course_id!: string;

    @Column({ type: 'varchar', length: 15 })
    lecturer_id!: string;

    @Column({ type: 'int' })
    semester_id!: number;

    @Column({ type: 'varchar', length: 15 })
    classroom_id!: string;

    @Column({ type: 'varchar', length: 15 })
    schedule!: string;

    @ManyToOne(() => Lecturer, lecturer => lecturer.class)
    @JoinColumn({ name: 'lecturer_id' })
    lecturer!: Lecturer;

    @ManyToOne(() => Classroom, classroom => classroom.classes)
    @JoinColumn({ name: 'classroom_id' })
    classroom!: Classroom;
    
    @OneToMany(() => Schedule, schedules => schedules.class)
    schedules!: Schedule;

    @ManyToOne(() => Course, course => course.classes)
    @JoinColumn({ name: 'course_id' })
    course!: Course;

    @ManyToOne(() => Semester, semester => semester.classes)
    @JoinColumn({ name: 'semester_id' })
    semester!: Semester;
}
