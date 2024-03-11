import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'administrator' })
export class Administrator extends BaseEntity {
  @PrimaryColumn({ type: 'varchar', length: 30 })
  nip!: string;

  @Column({ type: 'varchar', length: 100 })
  full_name!: string;

  @Column({ type: 'varchar', length: 15, unique: true })
  phone_number!: string;

  @Column({ type: 'uuid' })
  user_id!: string;
}
