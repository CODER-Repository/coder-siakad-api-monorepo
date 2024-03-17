ALTER TABLE payment_history
    ADD CONSTRAINT fk_nim_payment_history FOREIGN KEY (student_nim) REFERENCES student(nim),
    ADD CONSTRAINT fk_ukt_payment_history FOREIGN KEY (ukt_id) REFERENCES ukt(ukt_id);
