import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryColumn, JoinColumn } from 'typeorm';
import { Schedule } from './schedule.entity';
import { Classroom } from './classroom.entity';
import { Class } from './class.entity';

@Entity({ name: 'course' })
export class Course extends BaseEntity {
    @PrimaryColumn({ type: 'varchar', length: 15, name: 'course_id' })
    course_id!: string;

    @Column({ type: 'varchar', length: 15, name: 'classroom_id' })
    classroom_id!: string;

    @Column({ type: 'varchar', length: 100, name: 'course_name' })
    course_name!: string;

    @Column({ type: 'int', name: 'credit_hours' })
    credit_hours!: number;

    @OneToMany(() => Schedule, schedule => schedule.course)
    schedule!: Schedule;

    @ManyToOne(() => Classroom, classroom => classroom.course)
    @JoinColumn({ name: 'classroom_id' })
    classroom!: Classroom;

    @ManyToOne(() => Class, entityClass => entityClass.course)
    @JoinColumn({ name: 'course_id' })
    classes!: Class;
}
