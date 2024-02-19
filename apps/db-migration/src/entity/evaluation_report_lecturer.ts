import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'evaluation_report_lecturer' })
export class EvaluationReportLecturer {
    @PrimaryColumn({ type: 'varchar', length: 30 })
    evaluation_report_id: string;

    @Column({ type: 'varchar', length: 30 })
    student_id: string;

    @Column({ type: 'varchar', length: 10 })
    lecturer_id: string;

    @Column({ type: 'int' })
    semester_id: number;

    @Column({ type: 'int', default: 0 })
    rating: number;

    @Column({ type: 'text', nullable: true })
    feedback: string;
}