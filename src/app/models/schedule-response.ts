import { Lesson } from "./lesson";

export interface ScheduleResponse {
    groupName: string;
    groupId: number;
    lessons: Map<Date, Map<Date, Lesson[]>>;
    startDate: Date;
    endDate: Date;
    webCalLink: string;
    icsLink: string;
    isFromSite: boolean;
}
