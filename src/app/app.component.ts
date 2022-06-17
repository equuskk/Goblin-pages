import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import {Observable} from "rxjs/internal/Observable";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'japanese-goblin';
    public isCollapsed = true;

    constructor() {
        let checkAuthRoute = `${window.origin}/`
    }
}
