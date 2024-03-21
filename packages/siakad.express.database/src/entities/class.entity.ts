import { BaseEntity, Column, Entity, ManyToMany, OneToMany, OneToOne, PrimaryColumn } from 'typeorm';
import { Lecturer } from './lecture.entity';
import { Schedule } from './schedule.entity';
import { Classroom, Course } from '.';

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
    schedule!: Schedule;

    @ManyToMany(() => Lecturer, lecturer => lecturer.class)
    lecturer!: Lecturer;

    @OneToMany(() => Classroom, entityClassroom => entityClassroom.class)
    classroom!: Classroom;

    @OneToMany(() => Course, course => course.class)
    course!: Course;
}
