import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn } from 'typeorm';
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

    @OneToOne(() => Schedule, schedule => schedule.class_id)
    @JoinColumn({ name: 'class_id' })
    schedule!: Schedule;

    @ManyToOne(() => Lecturer, lecturer => lecturer.class)
    @JoinColumn({ name: 'lecturer_id' })
    lecturer!: Lecturer;

    @ManyToOne(() => Classroom, classroom => classroom.classes)
    @JoinColumn({ name: 'classroom_id' })
    classroom!: Classroom;

    @OneToMany(() => Course, course => course.classes)
    course!: Course;

    @ManyToOne(() => Semester, semester => semester.classes)
    @JoinColumn({ name: 'semester_id' })
    semester!: Semester;
}
