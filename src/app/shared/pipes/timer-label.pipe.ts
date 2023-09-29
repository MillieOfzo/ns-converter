/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable prefer-destructuring */
import { Pipe, PipeTransform } from '@angular/core';
import { ThemeProvider } from '../providers';

@Pipe({
  name: 'timerLabel',
})
export class TimerLabelPipe implements PipeTransform {
  constructor(private themeProvider: ThemeProvider) {}

  transform(dateTime: Date): string {
    // const dateTime = new Date('2019-11-08T18:38:16.001Z');

    const utcHours = dateTime.getHours();

    this.themeProvider.setSideMenuBackground(this.lakeSideRotation(utcHours));

    // avond 20:00 - 00:00
    if (utcHours >= 20 && utcHours <= 23) {
      return 'Goedenavond';
    }

    // middernacht 00:00 - 04:00
    if (utcHours >= 0 && utcHours < 4) {
      return 'Goedenacht';
    }

    // ochtend 04:00 - 12:00
    if (utcHours >= 4 && utcHours < 12) {
      return 'Goedemorgen';
    }

    // middag 12:00 - 16:00
    if (utcHours >= 12 && utcHours < 16) {
      return 'Goedemiddag';
    }

    // namiddag 16:00 - 20:00
    return 'Goedendag';
  }

  private lakeSideRotation(hours) {
    let img = '';
    let url = '/assets/images/backgrounds/lakeside/';
    // 1	4:00 - 5:59
    if (hours >= 4 && hours < 6) {
      img = '01.png';
    }

    // 2	6:00 - 7:59
    if (hours >= 6 && hours < 8) {
      img = '02.png';
    }

    // 3	8:00 - 9:59
    if (hours >= 8 && hours < 10) {
      img = '03.png';
    }

    // 4	10:00 - 11:59
    if (hours >= 10 && hours < 12) {
      img = '04.png';
    }

    // 5	12:00- 13:59
    if (hours >= 12 && hours < 14) {
      img = '05.png';
    }

    // 6	14:00 - 15:59
    if (hours >= 14 && hours < 16) {
      img = '06.png';
    }

    // 7	16:00 - 17:59
    if (hours >= 16 && hours < 18) {
      img = '07.png';
    }

    // 8	18:00 - 19:59
    if (hours >= 18 && hours < 20) {
      img = '08.png';
    }

    // 9	20:00 - 21:59
    if (hours >= 20 && hours < 22) {
      img = '09.png';
    }

    // 10	22:00- 23:59
    if (hours >= 22 && hours <= 23) {
      img = '10.png';
    }
    // 11	00:00- 1:59
    if (hours >= 0 && hours < 2) {
      img = '11.png';
    }
    // 12	2:00 - 3:59
    if (hours >= 2 && hours < 4) {
      img = '12.png';
    }

    url += img;
    return url;
  }
}
