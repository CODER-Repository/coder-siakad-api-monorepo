import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

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
}
