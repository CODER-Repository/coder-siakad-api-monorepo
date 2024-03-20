export enum Status {
  onGoing = 'On Going',
  inProgress = 'In Progress',
  finished = 'Finished',
}

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
    course_name: string;
    time_start: string;
    time_end: string;
    class_id: string;
    room: string,
    faculty: string,
  }[];
  tuesday: {
    schedule_id: string;
    course_id: string;
    course_name: string;
    time_start: string;
    time_end: string;
    class_id: string;
    room: string,
    faculty: string,
  }[];
  wednesday: {
    schedule_id: string;
    course_id: string;
    course_name: string;
    time_start: string;
    time_end: string;
    class_id: string;
    room: string,
    faculty: string,
  }[];
  thursday: {
    schedule_id: string;
    course_id: string;
    course_name: string;
    time_start: string;
    time_end: string;
    class_id: string;
    room: string,
    faculty: string,
  }[];
  friday: {
    schedule_id: string;
    course_id: string;
    course_name: string;
    time_start: string;
    time_end: string;
    class_id: string;
    room: string,
    faculty: string,
  }[];
  saturday: {
    schedule_id: string;
    course_id: string;
    course_name: string;
    time_start: string;
    time_end: string;
    class_id: string;
    room: string,
    faculty: string,
  }[];
  sunday: {
    schedule_id: string;
    course_id: string;
    course_name: string;
    time_start: string;
    time_end: string;
    class_id: string;
    room: string,
    faculty: string,
  }[];
}
