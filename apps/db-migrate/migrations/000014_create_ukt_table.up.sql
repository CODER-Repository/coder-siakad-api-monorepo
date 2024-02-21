CREATE TABLE IF NOT EXISTS ukt (
    ukt_id VARCHAR(15) PRIMARY KEY,
    study_program_id int4,
    amount BIGINT,
    payment_deadline TIMESTAMPTZ,
    created_at timestamptz DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamptz DEFAULT CURRENT_TIMESTAMP
);