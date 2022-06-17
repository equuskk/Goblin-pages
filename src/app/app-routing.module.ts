import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ScheduleDetailsComponent} from './schedule-details/schedule-details.component';
import {ScheduleComponent} from './schedule/schedule.component';
import {StartComponent} from './start/start.component';
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";

const appRoutes: Routes = [
    {
        path: '',
        component: StartComponent
    },
    {
        path: 'schedule',
        component: ScheduleComponent,
        children: [
            {
                path: ':groupId',
                component: ScheduleDetailsComponent
            }
        ]
    },
    {
        path: '**',
        component: PageNotFoundComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}