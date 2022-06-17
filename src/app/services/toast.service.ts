import { Injectable } from '@angular/core';
export interface ToastInfo {
    header: string;
    body: string;
    delay?: number;
    type?: string;
    style: string;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
    toasts: ToastInfo[] = [];

    show(header: string, body: string, style: string = "") {
        this.toasts.push({ header, body, style });
    }

    showError(body: string) {
        this.show("Ошибка!", body, "bg-danger text-light");
    }

    remove(toast: ToastInfo) {
        this.toasts = this.toasts.filter(t => t != toast);
    }
}