CREATE TABLE IF NOT EXISTS ukt (
    ukt_id VARCHAR(15) PRIMARY KEY,
    program_id BIGINT,
    amount BIGINT,
    payment_deadline TIMESTAMPTZ
);