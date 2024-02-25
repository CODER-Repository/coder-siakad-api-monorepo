import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

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
}
