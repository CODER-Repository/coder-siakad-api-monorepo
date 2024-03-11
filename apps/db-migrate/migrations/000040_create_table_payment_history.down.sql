DROP TABLE IF EXISTS payment_history;

DROP TYPE IF EXISTS payment_status;

DROP SEQUENCE IF EXISTS payment_history_id_seq;

DROP FUNCTION IF EXISTS generate_payment_history_id();
