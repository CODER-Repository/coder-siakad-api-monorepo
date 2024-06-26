CREATE TABLE IF NOT EXISTS evaluation_lecturer (
    evaluation_id SERIAL PRIMARY KEY,
    nim VARCHAR(30),
    lecturer_id VARCHAR(10) NOT NULL,
    semester_id VARCHAR(5) NOT NULL,
    rating INT DEFAULT 0,
    feedback TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);
