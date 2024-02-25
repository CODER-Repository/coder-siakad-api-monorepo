import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'class' })
export class Class extends BaseEntity {
    @PrimaryColumn({ type: 'varchar', length: 15 })
    class_id!: string;

    @Column({ type: 'int' })
    course_id!: number;

    @Column({ type: 'varchar', length: 15 })
    lecturer_id!: string;

    @Column({ type: 'int' })
    semester_id!: number;

    @Column({ type: 'varchar', length: 15 })
    classroom_id!: string;

    @Column({ type: 'varchar', length: 100 })
    schedule!: string;
}
