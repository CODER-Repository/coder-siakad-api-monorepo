import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'faculty' })
export class Faculty extends BaseEntity {
    @PrimaryGeneratedColumn({ type: 'int4' })
    faculty_id!: number;

    @Column({ type: 'varchar', length: 50 })
    faculty_name!: string;
}