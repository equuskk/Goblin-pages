import { LessonType } from "./lesson-type";

export interface Lesson {
    id: string;
    type: string;
    name: string;
    startTime: Date;
    endTime: Date;
    startEndTime: string;
    number: number;
    address: string;
    auditory: string;
    teacher: string;
    groups: string;
    lessonType: LessonType;

    link: string;
}