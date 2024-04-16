import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Course } from './course.entity';
import { Student } from './student.entity';
import { Semester } from './semester.entity';

@Entity({ name: 'krs' })
export class KRS extends BaseEntity {
    @PrimaryGeneratedColumn()
    krs_id!: number;

    @Column({ type: 'varchar', length: 30 })
    nim!: string;
    // student_id!: string;

    @Column({ type: 'int' })
    course_id!: string;

    @Column({ type: 'varchar', length: 100 })
    semester_id!: string;

    @Column({ type: 'bigint' })
    grade!: number;

    @ManyToOne(() => Course, course => course.krs)
    @JoinColumn({ name: 'course_id' })
    course!: Course;

    @ManyToOne(() => Student, student => student.krs)
    @JoinColumn({ name: 'nim' })
    student!: Student;

    @ManyToOne(() => Semester, semester => semester.krs)
    @JoinColumn({ name: 'semester_id' })
    semester!: Semester;
}
