CREATE OR REPLACE FUNCTION check_user_role()
RETURNS TRIGGER AS $$
BEGIN
    -- Check if the user email exists in the student table
    IF EXISTS (SELECT 1 FROM student WHERE email = NEW.email) THEN
        RAISE EXCEPTION 'User with email % already exists in the student table', NEW.email;
    END IF;
    
    -- Check if the user email exists in the lecturer table
    IF EXISTS (SELECT 1 FROM lecturer WHERE email = NEW.email) THEN
        RAISE EXCEPTION 'User with email % already exists in the lecturer table', NEW.email;
    END IF;

    -- If the email does not exist in either table, allow the insertion
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create a trigger to enforce the constraint
CREATE TRIGGER enforce_student_user_role_constraint
BEFORE INSERT ON student
FOR EACH ROW EXECUTE FUNCTION check_user_role();

CREATE TRIGGER enforce_lecturer_user_role_constraint
BEFORE INSERT ON lecturer
FOR EACH ROW EXECUTE FUNCTION check_user_role();
