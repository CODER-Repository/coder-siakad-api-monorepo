import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity({ name: 'grade_category' })
export class GradeCategory extends BaseEntity {
    @PrimaryGeneratedColumn()
    gc_id!: number;

    @Column({ type: 'varchar', length: 100 })
    category!: string;
}
