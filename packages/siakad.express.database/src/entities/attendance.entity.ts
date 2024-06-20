import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'attendance' })
export class Attendance extends BaseEntity {
    @PrimaryColumn({ type: 'uuid' })
    attendance_id!: string;

    @Column({ type: 'varchar', length: 30 })
    student_id!: string;

    @Column({ type: 'uuid' })
    lecture_id!: string;

    @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    date!: Date;

    @Column({ type: 'varchar', length: 10 })
    status!: string;
}