import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeFormat',
})
export class TimeFormatPipe implements PipeTransform {

  transform(value: number | null): string {
    if(value === null || value < 0) return '00:00';
    
    const minutes: number = Math.floor(value/60);
    const seconds: number = value % 60;

    const minutesStr = minutes.toString().padStart(2, '0');
    const secondsStr = seconds.toString().padStart(2, '0');

    return `${minutesStr}:${secondsStr}`;
  }

}
