import { dbContext } from "../db-context";

export const getScheduleByNim = async (nim: string): Promise<any[]> => {
    try {
        const schedules = await dbContext.Schedule()
            .createQueryBuilder('schedule')
            .innerJoin('schedule.student', 'student', 'student.nim = :nim', { nim: nim })
            .innerJoin('schedule.course', 'course', 'schedule.course_id = course.course_id')
            .innerJoin('course.classroom', 'classroom', 'course.classroom_id = classroom.classroom_id')
            .innerJoin('classroom.faculty', 'faculty', 'classroom.faculty_id = faculty.faculty_id')
            .where('student.nim = :nim', { nim: nim })
            .select([
                'schedule.schedule_id AS schedule_id',
                'schedule.course_id AS course_id',
                'schedule.class_id AS class_id',
                'schedule.semester_id AS semester_id',
                'schedule.start_time AS time_start',
                'schedule.end_time AS time_end',
                'course.course_name AS course_name',
                'classroom.classroom_name AS room',
                'faculty.faculty_name AS faculty'
            ])
            .getRawMany();

        return schedules;
    } catch (error) {
        console.error("Error retrieving schedules with details:", error);
        throw error;
    }
};

export const getScheduleList = async (nim: string) => {
    try {
        const schedules = await dbContext.Schedule()
            .createQueryBuilder('schedule')
            .innerJoin('schedule.student', 'student', 'schedule.nim = student.nim')
            .innerJoin('schedule.course', 'course', 'schedule.course_id = course.course_id')
            .innerJoin('course.classroom', 'classroom', 'course.classroom_id = classroom.classroom_id')
            .innerJoin('classroom.faculty', 'faculty', 'classroom.faculty_id = faculty.faculty_id')
            .select([
                'schedule.schedule_id AS schedule_id',
                'schedule.course_id AS course_id',
                'course.course_name AS course_name',
                'classroom.classroom_name AS course_room',
                'faculty.faculty_name AS faculty',
                'schedule.start_time AS time_start',
                'schedule.end_time AS time_end',
                'schedule.class_id AS class_id',
            ])
            .where('student.nim = :nim', { nim: nim || '' })
            .getRawMany();

        return schedules; // Return schedules here
    } catch (error) {
        console.error("Error fetching schedules:", error);
        throw error;
    }
}

export const getScheduleListToday = async (today: string, nim: string): Promise<any[]> => {
    try {
        const schedules = await dbContext.Schedule()
            .createQueryBuilder('schedule')
            .innerJoin('schedule.student', 'student', 'schedule.nim = student.nim')
            .innerJoin('schedule.course', 'course', 'schedule.course_id = course.course_id')
            .innerJoin('course.classroom', 'classroom', 'course.classroom_id = classroom.classroom_id')
            .innerJoin('classroom.faculty', 'faculty', 'classroom.faculty_id = faculty.faculty_id')
            .select([
                'schedule.schedule_id AS schedule_id',
                'schedule.course_id AS course_id',
                'course.course_name AS course_name',
                'classroom.classroom_name AS course_room',
                'faculty.faculty_name AS faculty',
                'schedule.start_time AS time_start',
                'schedule.end_time AS time_end',
                'schedule.class_id AS class_id',
            ])
            .where('schedule.type = :type', { type: today })
            .where('student.nim = :nim', { nim: nim || '' })
            .getRawMany();

        return schedules;
    } catch (error) {
        console.error("Error fetching schedules:", error);
        throw error;
    }
}
