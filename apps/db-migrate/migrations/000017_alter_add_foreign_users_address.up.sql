ALTER TABLE address
ADD CONSTRAINT fk_student_address_id
FOREIGN KEY (nim)
REFERENCES student (nim);