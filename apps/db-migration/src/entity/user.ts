import { Column, Entity, Index, PrimaryColumn } from 'typeorm';

@Entity({ name: 'user' })
export class User {
    @Index()
    @PrimaryColumn({ type: 'uuid'})
    user_id: string;

    @Index()
    @Column({ type: 'varchar', length: 50 })
    username: string;

    @Index()
    @Column({ type: 'varchar', length: 50, unique: true })
    email: string;

    @Column({ type: 'varchar', length: 100 })
    password: string;
}