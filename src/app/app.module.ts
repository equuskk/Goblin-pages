import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NgbModule, NgbNavModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {CommonModule, registerLocaleData} from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import {UrlSerializer} from "@angular/router"

import {NgxGoogleAnalyticsModule} from "ngx-google-analytics";

import {StartComponent} from './start/start.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {ScheduleComponent} from './schedule/schedule.component';
import {ScheduleDetailsComponent} from './schedule-details/schedule-details.component';
import {LessonComponent} from './lesson/lesson.component';
import {LessonTypeColorPipe} from './pipes/lesson-type-color-pipe';
import {WeekStartEndPipe} from './pipes/week-start-end-pipe';
import {ToastContainerComponent} from './toast-container/toast-container.component';
import {LowerCaseUrlSerializer} from "./lower-case-url-serializer";
import {HttpToastInterceptor} from "./http-toast.interceptor";

registerLocaleData(localeRu, 'ru');

@NgModule({
    declarations: [
        AppComponent,
        ScheduleComponent,
        StartComponent,
        ScheduleDetailsComponent,
        LessonComponent,
        LessonTypeColorPipe,
        WeekStartEndPipe,
        ToastContainerComponent,
        PageNotFoundComponent,
    ],
    imports: [
        CommonModule,
        BrowserModule,
        AppRoutingModule,
        NgbModule,
        NgbNavModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        NgbNavModule,
        NgxGoogleAnalyticsModule.forRoot('G-XP0G1G0E7J')
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpToastInterceptor,
            multi: true
        },
        {
            provide: UrlSerializer,
            useClass: LowerCaseUrlSerializer
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
