import { BaseEntity, Column, Entity, Index, PrimaryColumn } from 'typeorm';

@Entity({ name: 'address' })
export class Address extends BaseEntity {
    @PrimaryColumn({ type: 'varchar', length: 30 })
    nim!: string;

    @Column({ type: 'text' })
    street!: string;

    @Index()
    @Column({ type: 'varchar', length: 100 })
    city!: string;

    @Column({ type: 'varchar', length: 10 })
    zip_code!: string;

    @Column({ type: 'varchar', length: 30 })
    country!: string;
}
