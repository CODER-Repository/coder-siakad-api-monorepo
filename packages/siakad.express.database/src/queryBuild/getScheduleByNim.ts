import { dbContext } from "../db-context";

export const getScheduleByNim = async (nim: string): Promise<any[]> => {
    try {
        const schedules = await dbContext.Schedule()
            .createQueryBuilder('schedule')
            .innerJoinAndSelect('schedule.students', 'student')
            .innerJoinAndSelect('schedule.course', 'course')
            .innerJoinAndSelect('course.classroom', 'room')
            .innerJoinAndSelect('room.faculty', 'faculty')
            .where('student.nim = :nim', { nim: nim })
            .getRawMany();

        return schedules;
    } catch (error) {
        console.error("Error retrieving schedules with details:", error);
        throw error;
    }
};