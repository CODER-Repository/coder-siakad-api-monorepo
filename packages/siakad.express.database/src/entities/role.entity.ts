import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'role' })
export class Role extends BaseEntity {
    @PrimaryColumn({
        type: 'varchar',
        nullable: false,
        length: 10,
        unique: true
    })
    role_id!: string;

    @Column({ type: 'varchar', length: 50 })
    role_name!: string;

    @Column({ type: 'varchar', length: 100 })
    role_description!: string;
}
