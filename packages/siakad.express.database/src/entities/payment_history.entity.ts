import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'payment_history' })
export class PaymentHistory extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    payment_history_id!: string;

    @Column({ type: 'varchar', nullable: true })
    invoice_url!: string;

    @Column({ type: 'varchar', nullable: false })
    payment_method!: string;

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
    amount!: number;

    @Column({ type: 'timestamp', nullable: false })
    payment_date!: Date;

    @Column({ type: 'varchar', nullable: false })
    payment_status!: string;
}
