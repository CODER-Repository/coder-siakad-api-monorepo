import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Schedule } from '.';

@Entity({ name: 'semester' })
export class Semester extends BaseEntity {
    @PrimaryColumn({ type: 'varchar', length: 5 })
    semester_id!: string;

    @Column({ type: 'int4' })
    year!: number;

    @Column({ type: 'date' })
    start_date!: Date;

    @Column({ type: 'date' })
    end_date!: Date;

    @OneToMany(() => Schedule, schedule => schedule.schedule_id)
    schedule!: Schedule;
}
