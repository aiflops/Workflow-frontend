import { Injectable } from '@angular/core';
declare var moment;

@Injectable({
  providedIn: 'root'
})
export class MounthService {

  constructor() { }



  public getFirstMondayCalendar( todayDay): any {
    let firstDay  = this.getFirstDayOfMouth(todayDay);
    let tmp = firstDay.format('dddd');
    if( tmp !== 'poniedziałek') {
      let tmpDay, tmpDayName;        
      let loopFlag = true;

      while (loopFlag) {
        tmpDay = firstDay.subtract(1, 'days');
        tmpDayName = tmpDay.format('dddd');
        if( tmpDayName === 'poniedziałek') {
          loopFlag = false;
        }
      }
      return tmpDay;
    }else {
      return firstDay;
    }
  }


  public getFirstMondayCalendarChange(day) {
    let tmp = day.format('dddd');
    if( tmp !== 'poniedziałek') {
      let tmpDay, tmpDayName;        
      let loopFlag = true;
      
      while (loopFlag) {
        tmpDay = day.subtract(1, 'days');
        tmpDayName = tmpDay.format('dddd');
        if( tmpDayName === 'poniedziałek') {
          loopFlag = false;
        }
      }
      return tmpDay.calendar();
    }else {
      return day;
    }
  }


  public getFirstDayOfMouth(todayDay): any {
    const tmpday  = moment().subtract(todayDay - 1 , 'days');
    return tmpday;
  }

  public getFirstDayOfMouthChange(todayDay): any {
    const tmpday  = moment().subtract(todayDay - 1 , 'days');
    return tmpday;
  }

  public getDaysMomentArray (day): Array<any> {
    const firstDayInCalendar = day;
    let arrayMoment: Array <any> = [firstDayInCalendar.format('L')];

    for( let i = 0 ; i < 41; i++) {
        const tmp = firstDayInCalendar.add(1, 'days').format('L');
        arrayMoment.push(tmp);
    }

    return arrayMoment;

  }

  public sliceDaysMomentArray(tmpArray) {
    // let tmpArray  =  this.getDaysMomentArray(day);
    let displayArray = [tmpArray.slice(0,7), tmpArray.slice(7,14), 
      tmpArray.slice(14,21), tmpArray.slice(21, 28), tmpArray.slice(28, 35), tmpArray.slice(35)];
    return displayArray;
  }
}
