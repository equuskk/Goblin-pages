import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'weekStartEnd' })
export class WeekStartEndPipe implements PipeTransform {
    transform(value: Date): string {
        let date = new Date(value);
        let firstDay = date.toLocaleDateString('ru-RU');
        let lastDate = new Date(date);
        lastDate.setDate(date.getDate() + 6);
        let lastDay = lastDate.toLocaleDateString('ru-RU');

        return `${firstDay} - ${lastDay}`
    }
}