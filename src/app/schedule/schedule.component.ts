import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';


@Component({
    selector: 'app-schedule',
    templateUrl: './schedule.component.html',
    styleUrls: ['./schedule.component.scss'],
    providers: [],
})
export class ScheduleComponent implements OnInit {

    minDate: Date;
    checkoutForm = this.formBuilder.group({
        groupId: undefined,
        date: undefined
    });

    constructor(private formBuilder: FormBuilder, private router: Router) {
        const thisYear = new Date().getFullYear();
        this.minDate = new Date(thisYear - 1, 8, 1);
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    }

    ngOnInit(): void {
    }

    onSubmit(): void {
        if (!this.checkoutForm.valid) {
            return;
        }

        let groupId = this.checkoutForm.get('groupId')?.value;
        let date = this.checkoutForm.get('date')?.value;
        this.router.navigate(['/schedule', groupId], {queryParams: {date}});
    }
}
