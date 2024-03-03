import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'ukt' })
export class UKT extends BaseEntity {
    @PrimaryColumn({ type: 'varchar', length: 15 })
    ukt_id!: string;

    @Column({ type: 'bigint' })
    study_program_id!: number;

    @Column({ type: 'bigint' })
    amount!: number;

    // Set the deadline on application layer
    @Column({ type: 'timestamptz' })
    payment_deadline!: Date;
}
