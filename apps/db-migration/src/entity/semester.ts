import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'semester' })
export class Semester {
    @PrimaryColumn({ type: 'varchar', length: 5 })
    semester_id: string;

    @Column({ type: 'year' })
    year: number;

    @Column({ type: 'date' })
    start_date: Date;

    @Column({ type: 'date' })
    end_date: Date;
}