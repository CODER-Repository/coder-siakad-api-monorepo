import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'report' })
export class Report {
    @PrimaryGeneratedColumn()
    report_id: number;

    @Column({ type: 'int' })
    category_id: string;

    // What's the purpose of this column?
    @Column({ type: 'varchar', length: 200 })
    report_name: string;

    @Column({ type: 'text' })
    description: string;

    @Column({ type: 'timestamptz', default: 0 })
    created_at: number;

    @Column({ type: 'text', nullable: true })
    feedback: string;
}