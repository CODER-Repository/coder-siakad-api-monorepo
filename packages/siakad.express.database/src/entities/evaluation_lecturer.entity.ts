import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'evaluation_lecturer' })
export class EvaluationLecturer extends BaseEntity {
    @PrimaryGeneratedColumn()
    evaluation_id!: number;

    @Column({ type: 'varchar', length: 30 })
    student_id!: string;

    @Column({ type: 'varchar', length: 10 })
    lecturer_id!: string;

    @Column({ type: 'int' })
    semester_id!: string;

    @Column({ type: 'int', default: 0 })
    rating!: number;

    @Column({ type: 'text', nullable: true })
    feedback!: string;
}
