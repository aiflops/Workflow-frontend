import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { UserLogin } from 'src/app/models/models';

declare var moment;

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {

  public date = null;
  public days  = [];

  public usersList = new Array<UserLogin>();
  public userFullName = new Array<String>();

  constructor(private api: ApiService) { 
    moment.locale("pl");
    this.date = moment();
    this.days = this.createCalender();

    this.api.getUsers().subscribe(res=> {
      this.usersList = res.data;
      this.userFullName = this.usersList.map(item => {
        return item.firstName + ' '+ item.lastName;
      });
    });

  }

  public hover(day) {
    console.log(day.calendar());
  }

  public createCalender() {
    let firstDay = moment().subtract(2, 'd');
    let days = Array.apply(null, {length: 17})
    .map(Number.call, Number)
    .map( item => { return moment(firstDay).add(item, 'd') });
    return days;
  }

  public todayCheck(day) {
    if(!day){
      return false;
    }else {
      return moment().format('L') === day.format("L");
    }
  }

  public checkActiveDay(day) {
    if(!day){
      return false;
    }else {
      return (moment().diff(day) < 0 || this.todayCheck(day)) && day.format('dddd')!== 'sobota' && day.format('dddd')!== 'niedziela';
    }
  }

  ngOnInit() {  }

}
