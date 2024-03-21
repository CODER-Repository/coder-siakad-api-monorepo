import { BaseEntity, Column, Entity, PrimaryColumn, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { Course } from './course.entity';
import { Faculty } from './faculty.entity';
import { Class } from './class.entity';

@Entity({ name: 'classroom' })
export class Classroom extends BaseEntity {
    @PrimaryColumn({ type: 'varchar', length: 15 })
    classroom_id!: string;

    @Column({ type: 'varchar', length: 100 })
    classroom_name!: string;

    @Column({ type: 'int4' })
    faculty_id!: number;

    @OneToMany(() => Course, course => course.classroom)
    course!: Course;

    @OneToOne(() => Faculty, faculty => faculty.classroom)
    @JoinColumn({ name: 'faculty_id' })
    faculty!: Faculty;

    @OneToMany(() => Class, classEntity => classEntity.classroom)
    classes!: Class;
}
