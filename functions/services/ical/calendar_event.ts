export class CalendarEvent {
    uid: string;
    dtStart: Date;
    dtEnd: Date;
    description: string;
    location: string;
    summary: string;

    constructor(uid: string, dtStart: Date, dtEnd: Date, descr: string, loc: string, sum: string) {
        this.uid = uid;
        this.dtStart = dtStart;
        this.dtEnd = dtEnd;
        this.description = descr;
        this.location = loc;
        this.summary = sum;
    }
}