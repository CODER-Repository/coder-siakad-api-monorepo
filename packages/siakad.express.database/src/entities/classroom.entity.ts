import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'classroom' })
export class Classroom extends BaseEntity {
    @PrimaryColumn({ type: 'varchar', length: 15 })
    classroom_id!: string;

    @Column({ type: 'varchar', length: 100 })
    classroom_name!: string;

    @Column({ type: 'int' })
    faculty_id!: number;
}
