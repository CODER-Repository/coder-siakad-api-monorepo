import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'report' })
export class Report extends BaseEntity {
    @PrimaryGeneratedColumn()
    report_id!: number;

    @Column({ type: 'int' })
    category_id!: string;

    @Column({ type: 'varchar', length: 100 })
    report_name!: string;

    @Column({ type: 'text' })
    description!: string;

    @Column({ type: 'timestamptz', default: 0 })
    created_at!: number;

    @Column({ type: 'text', nullable: true })
    feedback!: string;
}
