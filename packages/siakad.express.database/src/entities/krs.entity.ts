import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'krs' })
export class KRS extends BaseEntity {
    @PrimaryGeneratedColumn()
    krs_id!: number;

    @Column({ type: 'varchar', length: 30 })
    student_id!: string;

    @Column({ type: 'int' })
    course_id!: string;

    @Column({ type: 'varchar', length: 100 })
    semester_id!: string;

    @Column({ type: 'bigint' })
    grade!: string;
}
