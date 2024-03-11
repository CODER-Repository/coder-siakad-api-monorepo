export interface TodaySchedule {
  schedule_id: number;
  course_id: string;
  course_name: string;
  time_start: string;
  time_end: string;
  room: string;
  faculty: string;
  status: string;
}

export interface CurrentSchedule {
  monday: {
    schedule_id: string;
    course_id: string;
    time_start: string;
    time_end: string;
    class_id: string;
    semester_id: string;
  }[];
  tuesday: {
    schedule_id: string;
    course_id: string;
    time_start: string;
    time_end: string;
    class_id: string;
    semester_id: string;
  }[];
  wednesday: {
    schedule_id: string;
    course_id: string;
    time_start: string;
    time_end: string;
    class_id: string;
    semester_id: string;
  }[];
  thursday: {
    schedule_id: string;
    course_id: string;
    time_start: string;
    time_end: string;
    class_id: string;
    semester_id: string;
  }[];
  friday: {
    schedule_id: string;
    course_id: string;
    time_start: string;
    time_end: string;
    class_id: string;
    semester_id: string;
  }[];
  saturday: {
    schedule_id: string;
    course_id: string;
    time_start: string;
    time_end: string;
    class_id: string;
    semester_id: string;
  }[];
  sunday: {
    schedule_id: string;
    course_id: string;
    time_start: string;
    time_end: string;
    class_id: string;
    semester_id: string;
  }[];
}
