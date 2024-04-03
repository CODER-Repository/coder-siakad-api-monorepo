export interface queryLecturerValidator {
    id: string;
    nip: string;
    name: string;
    gender: string;
    phone: string;
    email: string;
};

export interface queryStudentValidator {
    id: string;
    nim: string;
    name: string;
    major: string;
    entryYear: Date;
    email: string;
    phone: string;
    birthday: Date;
};

export interface queryCourseValidator {
    id: string;
    course: string;
    sks: number;
}

export interface queryClassroomValidator {
    id: string;
    classroom: string;
    facultyId: number;
    facultyName: string;
    courseId: string;
    courseName: string;
}

export interface queryClassValidator {
    id: string;
    courseId: string;
    course: string;
    classroomId: string;
    classroom: string;
    nip: string;
    lecturer: string;
    scheduleId: string;
    day: string;
    startTime: string,
    endTime: string,
}