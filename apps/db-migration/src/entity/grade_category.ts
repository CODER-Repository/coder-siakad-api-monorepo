import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'grade_category' })
export class GradeCategory {
    @PrimaryGeneratedColumn()
    gc_id: number;

    @Column({ type: 'varchar', length: 100 })
    category: string;
}