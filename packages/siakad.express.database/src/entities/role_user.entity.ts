import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'role_user' })
export class RoleUser extends BaseEntity {
    @PrimaryColumn({
        type: 'varchar',
        nullable: false,
        length: 10,
        unique: true
    })
    role_id!: string;

    @Column({ type: 'uuid', nullable: false })
    user_id!: string;
}
