import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MounthService } from './mounth.service';
import { DayModalComponent } from '../day-modal/day-modal.component';
import { ApiService } from 'src/app/services/api.service';
import { Subscription } from 'rxjs';


declare var moment;

@Component({
  selector: 'app-mounth',
  templateUrl: './mounth.component.html',
  styleUrls: ['./mounth.component.css']
})
export class MounthComponent implements OnInit {

  @ViewChild('dayModal') dayModal: DayModalComponent;
  
  public nowMoment: any;
  public todayDay: number;
  public  daysArray = [];

  public date = null;
  public daysArr;

  public isOpenModal = false;
  public subscriptionGetUserExits = new Subscription();

  public dayExits = [];


  constructor(
    public mounthService: MounthService,
    public apiService: ApiService
  ) { 
    moment.locale("pl");
    this.date = moment();
    // this.daysArr = this.createCalender(this.date);
    this.daysArr =  this.createCalender(this.date).map(element=> {
      return {
        moment: element,
        exit: null
      }
    });
    console.log(this.daysArr);
    
    this.subscriptionGetUserExits = this.apiService.getUserExits().subscribe(res=> {
      this.dayExits = res.data;
      this.daysArr =  this.createCalender(this.date).map(element=> {
        return {
          moment: element,
          exit: this.getExit(element)
        }
      });
    });
      
      // this.dayExits.forEach(dayExit => {

      //   console.log(moment(dayExit.date).isSame(this.mounthService.sliceDaysMomentArray(this.daysArr)[4][3]));
        
      // });

      // this.checkIfExit(this.mounthService.sliceDaysMomentArray(this.daysArr)[4][3]);
  }

  public getExit(day)
  {
    const tmp2 = this.dayExits.find(exit=> {
      return moment(exit.date).isSame(day);
    });

    const returnVal =  (!!tmp2) ? tmp2 : null;
    return returnVal;
  }

  public createCalender(mounth) {
    let firstDay = moment(mounth).startOf('M');
    let days = Array.apply(null, {length: mounth.daysInMonth()})
    .map(Number.call, Number)
    .map( item => { return moment(firstDay).add(item, 'd') });

    for(let i =0; i < firstDay.weekday(); i++) {
      days.unshift(null);
    }
    return days;
  }


  public todayCheck(day) {
    if(!day){
      return false;
    }else {
      return moment().format('L') === day.format("L");
    }
  }

  public weekendCheck(day) {

  }

  public checkActiveDay(day) {
    if(!day){
      return false;
    }else {
      return (moment().diff(day) < 0 || this.todayCheck(day)) && day.format('dddd')!== 'sobota' && day.format('dddd')!== 'niedziela';
    }
  }

  public leftArrow() {
    this.date.subtract(1, 'M');
    this.daysArr =  this.createCalender(this.date).map(element=> {
      return {
        moment: element,
        exit: this.getExit(element)
      }
    });
  }
 
  public rightArrow() {

    this.date.add(1, 'M');
    this.daysArr =  this.createCalender(this.date).map(element=> {
      return {
        moment: element,
        exit: this.getExit(element)
      }
    });
  }

  public newEntry(day) {
    if( this.checkActiveDay(day.moment)){
      this.dayModal.open(day);
      this.isOpenModal = true;
    }
  }

  ngOnInit() {}


  public getExits(event) {
    this.subscriptionGetUserExits = this.apiService.getUserExits().subscribe(res=> {
      this.dayExits = res.data;
      this.daysArr =  this.createCalender(this.date).map(element=> {
        return {
          moment: element,
          exit: this.getExit(element)
        }
      });
    });
  }

}
