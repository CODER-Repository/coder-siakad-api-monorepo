CREATE TYPE announcement_type AS ENUM (
    'event',
    'system-maintenance',
    'achievement',
    'deadline',
    'policy-change',
    'opportunity',
    'graduation',
    'emergency'
);

CREATE TABLE IF NOT EXISTS announcement (
    announcement_id UUID PRIMARY KEY,
    content TEXT NOT NULL,
    type announcement_type DEFAULT 'event'::announcement_type,
    priority INT DEFAULT 1,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);