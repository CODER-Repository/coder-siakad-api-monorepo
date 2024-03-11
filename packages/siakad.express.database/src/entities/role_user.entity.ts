import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'role_user' })
export class RoleUser extends BaseEntity {
    // TypeORM will not create id column for this entity
    @PrimaryColumn({
        type: 'uuid',
        insert: false,
        select: false,
        update: false
    })
    id!: never;

    @Column({ type: 'varchar', nullable: false })
    role_id!: string;

    @Column({ type: 'uuid', nullable: false })
    user_id!: string;
}
