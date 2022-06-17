import {LessonType} from "./lesson_type";

export class Lesson {
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

    link: string | undefined;

    constructor(id: string, type: string, name: string, start: Date, end: Date, startend: string,
                number: number, address: string, aud: string, teacher: string, group: string, link: string | undefined) {
        this.id = id;
        this.type = type;
        this.name = name.replace('. ', '.').replace('.', '. ');
        this.startTime = start;
        this.endTime = end;
        this.startEndTime = startend;
        this.number = number;
        this.address = address;
        this.auditory = aud;
        this.teacher = teacher;
        this.groups = group;
        this.lessonType = this.getLessonType(type);
        this.link = link;
    }
    
    getLessonType(str: string): LessonType {
        str = str.toLowerCase();
        if(str.includes("экзамен") || str.includes("зачет")) {
            return LessonType.exam;
        }
        if(str.includes("практическ")) {
            return LessonType.practical;
        }
        if(str.includes("лабораторн")) {
            return LessonType.laboratory;
        }
        if(str.includes("лекции")) {
            return LessonType.lecture;
        }
        if(str.includes("консультация")) {
            return LessonType.consultation;
        }
        
        return LessonType.unknown;
    }
}