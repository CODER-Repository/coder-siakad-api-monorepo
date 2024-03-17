import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Classroom } from './classroom.entity';

@Entity({ name: 'faculty' })
export class Faculty extends BaseEntity {
    @PrimaryGeneratedColumn({ type: 'int4' })
    faculty_id!: number;

    @Column({ type: 'varchar', length: 50 })
    faculty_name!: string;

    @OneToMany(() => Classroom, classroom => classroom.faculty_id)
    classroom!: Classroom;
}