import { CalendarEvent } from "./calendar_event";

export class Calendar {
    events: Array<CalendarEvent>;

    constructor(text: string) {
        this.events = new Array<CalendarEvent>();
        this.parseCalendar(text);
    }

    parseCalendar(text: string) {
        const regex = /BEGIN:VEVENT\s(?<vevent>.+?)\sEND:VEVENT/gs;
        [...text.matchAll(regex)].forEach(e => {
            let dict = this.parseEvent(e[0]);
            let event = new CalendarEvent(dict.get("UID")!, this.getDate(dict.get("DTSTART")!), this.getDate(dict.get("DTEND")!),
                                          dict.get("DESCRIPTION")!, dict.get("LOCATION")!, dict.get("SUMMARY")!);
            this.events.push(event);
        });
    }

    parseEvent(event: string): Map<string, string> {
        const regex = /[^|\n][A-Z-]+:/gs;
        let eventDictionary = new Map<string, string>();
        let lastEndKey: string = "";

        event = event.replaceAll("\r\n", "\n")
                     .replaceAll("\n\t", "")
                     .replaceAll("\\,", ",");
        
        event.split('\n').forEach(line =>{
            let match = line.match(regex);
            if(match) {
                let split = line.split(':');
                lastEndKey = split[0].trim();
                eventDictionary.set(lastEndKey, split.slice(1).join());
            }
            else {
                let lastValue = eventDictionary.get(lastEndKey);
                eventDictionary.set(lastEndKey, lastValue + "\n" + line.trim())
            }
        });

        return eventDictionary;
    }

    getDate(dt: string): Date {
        // 20220424T152420Z
        let year = dt.substring(0, 4);
        let month = dt.substring(4, 6);
        let day = dt.substring(6, 8);

        let hour = dt.substring(9, 11);
        let minute = dt.substring(11, 13);
        let seconds = dt.substring(13, 15);

        return new Date(`${year}-${month}-${day}T${hour}:${minute}:${seconds}+0000`)
    }
}