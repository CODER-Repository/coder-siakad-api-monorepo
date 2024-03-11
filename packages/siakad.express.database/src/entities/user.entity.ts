import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'user' })
export class User extends BaseEntity {
    @PrimaryColumn({ type: 'uuid', default: () => 'gen_random_uuid()' })
    user_id!: string;

    @Column({ type: 'varchar', length: 50 })
    username!: string;

    @Column({ type: 'varchar', length: 50, unique: true })
    email!: string;

    @Column({ type: 'varchar', length: 100 })
    password!: string;
}
