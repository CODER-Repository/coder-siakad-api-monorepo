import { Column, Entity, Index } from 'typeorm';

@Entity({ name: 'address' })
export class Address {
    @Column({ type: 'text' })
    street: string;

    @Index()
    @Column({ type: 'varchar', length: 100 })
    city: string;

    @Column({ type: 'varchar', length: 10 })
    zip_code: string;

    @Column({ type: 'varchar', length: 30 })
    country: string;

    @Column({ type: 'varchar', length: 30 })
    student_id: string;
}