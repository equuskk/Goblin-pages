import { Pipe, PipeTransform } from '@angular/core';
import { Lesson } from '../models/lesson';
import { LessonType } from '../models/lesson-type';

@Pipe({ name: 'lessonTypeColor' })
export class LessonTypeColorPipe implements PipeTransform {
    transform(value: Lesson): string {
        if(value.lessonType == LessonType.consultation) {
            return 'orange'
        }
        if(value.lessonType == LessonType.exam) {
            return 'red'
        }
        if(value.lessonType == LessonType.laboratory) {
            return 'blue'
        }
        if(value.lessonType == LessonType.lecture) {
            return 'green'
        }
        if(value.lessonType == LessonType.practical) {
            return 'yellow'
        }

        return 'transparent';
    }
}