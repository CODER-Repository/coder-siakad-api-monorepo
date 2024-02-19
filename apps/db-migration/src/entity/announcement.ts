import { Column, Entity, PrimaryColumn } from 'typeorm';

enum AnnouncementType {
    Event = 'event',
    SystemMaintenance = 'system-maintenance',
    Achievement = 'achievement',
    Deadline = 'deadline',
    PolicyChange = 'policy-change',
    Opportunity = 'opportunity',
    Graduation = 'graduation',
    Emergency = 'emergency',
}

@Entity({ name: 'announcement' })
export class Announcement {
    @PrimaryColumn({ type: 'uuid' })
    announcement_id: string;

    @Column({ type: 'text' })
    content: string;

    @Column({ type: 'enum', enum: AnnouncementType, default: AnnouncementType.Event })
    type: string;

    @Column({ type: 'int4', default: 1 })
    priority: number;

    @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;
}