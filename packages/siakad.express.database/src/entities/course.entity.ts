import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryColumn, JoinColumn } from 'typeorm';
import { Schedule } from './schedule.entity';
import { Classroom } from './classroom.entity';

@Entity({ name: 'course' })
export class Course extends BaseEntity {
    @PrimaryColumn({ type: 'varchar', length: 15 })
    course_id!: string;

    @Column({ type: 'varchar', length: 15 })
    classroom_id!: string;

    @Column({ type: 'varchar', length: 100 })
    course_name!: string;

    @Column({ type: 'int' })
    credit_hours!: number;

    @OneToMany(() => Schedule, schedule => schedule.course_id)
    schedule!: Schedule;

    @ManyToOne(() => Classroom, classroom => classroom.course)
    @JoinColumn({ name: 'classroom_id' })
    classroom!: Classroom;
}
