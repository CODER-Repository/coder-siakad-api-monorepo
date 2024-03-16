import { BaseEntity, Column, Entity, ManyToMany, OneToOne, PrimaryColumn } from 'typeorm';
import { Lecturer } from './lecture.entity';
import { Schedule } from './schedule.entity';

@Entity({ name: 'class' })
export class Class extends BaseEntity {
    @PrimaryColumn({ type: 'varchar', length: 15 })
    class_id!: string;

    @Column({ type: 'int' })
    course_id!: number;

    @Column({ type: 'varchar', length: 15 })
    lecturer_id!: string;

    @Column({ type: 'int' })
    semester_id!: number;

    @Column({ type: 'varchar', length: 15 })
    classroom_id!: string;

    @OneToOne(() => Schedule, schedule => schedule.schedule_id)
    schedule!: Schedule;

    @ManyToMany(() => Lecturer, lecturer => lecturer.nip)
    lecturer!: Lecturer;
}
