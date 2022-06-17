import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ScheduleResponse } from '../models/schedule-response';
import { ScheduleServiceService } from '../services/schedule.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';


@Component({
    selector: 'app-schedule-details',
    templateUrl: './schedule-details.component.html',
    styleUrls: ['./schedule-details.component.scss'],
})
export class ScheduleDetailsComponent implements OnInit {

    groupId?: Number;
    date?: Date;
    response!: ScheduleResponse;
    pattern: RegExp = /(\d{2})\.(\d{2})\.(\d{4})/;
    isFromCache: boolean = false;

    constructor(private route: ActivatedRoute,
                private service: ScheduleServiceService,
                private sanitizer: DomSanitizer) {
        let queryDate = this.route.snapshot.queryParamMap.get('date');
        let date = new Date();
        if(queryDate !== null && !queryDate.match(this.pattern)) {
            queryDate.match(this.pattern)
            date = new Date(queryDate.replace(this.pattern, '$3-$2-$1'));
        }
        this.route.params.subscribe(params => {
            this.groupId = params['groupId'];
            this.service.getLessons(this.groupId, date)
                .subscribe({
                    next: response => {
                        this.response = response;
                        localStorage.setItem(`schedule_${this.groupId}`, JSON.stringify(response));
                    },
                    error: r => {
                        this.isFromCache = true;
                        this.response = JSON.parse(localStorage.getItem(`schedule_${this.groupId}`) ?? "{}");
                    }
                });
        });
    }

    ngOnInit(): void {
    }

    sanitize(text: string): SafeUrl {
        return this.sanitizer.bypassSecurityTrustUrl(text);
    }
}
