import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'administrator' })
export class Administrator {
    @PrimaryColumn({ type: 'varchar', length: 30 })
    nip: string;

    @Column({ type: 'varchar', length: 100 })
    full_name: string;

    @Column({ type: 'varchar', length: 15, unique: true })
    phone_number: string;

    @Column({ type: 'bigint' })
    user_id: number;
}