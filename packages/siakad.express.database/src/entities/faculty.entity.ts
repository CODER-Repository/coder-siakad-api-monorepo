import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'faculty' })
export class Faculty extends BaseEntity {
    @PrimaryColumn({ type: 'varchar', length: 15 })
    faculty_id!: string;

    @Column({ type: 'varchar', length: 50 })
    faculty_name!: string;
}