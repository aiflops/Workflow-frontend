import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { UserLogin } from 'src/app/models/models';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

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

  public exitsArray = new Array<any>();

  constructor(private api: ApiService) {
    moment.locale('pl');
    this.date = moment();
    this.days = this.createCalender();

    const getUsers = this.api.getUsers();
    const getTimeTable =  this.api.usersTimetables();

    forkJoin([getUsers, getTimeTable]).pipe(map(x => {
      x = [x[0].data, x[1].data];
      return x;
    })).subscribe(results => {
      this.usersList = results[0];
      this.userFullName = this.usersList.map(item => {
        return item.firstName + ' ' + item.lastName;
      });
      this.exitsArray = results[1];
      console.log('exitsArray', this.exitsArray);
    });

  }

  public hover(day) {
    console.log(day.calendar());
  }

  public createCalender() {
    let firstDay = moment().subtract(2, 'd');
    let days = Array.apply(null, {length: 17})
    .map(Number.call, Number)
    .map( item => {
      return moment(firstDay).add(item, 'd');
     });
    return days;
  }

  public todayCheck(day) {
    if (!day) {
      return false;
    } else {
      return moment().format('L') === day.format('L');
    }
  }

  public checkActiveDay(day) {
    if (!day) {
      return false;
    } else {
      return (moment().diff(day) < 0 || this.todayCheck(day)) && day.format('dddd') !== 'sobota' && day.format('dddd') !== 'niedziela';
    }
  }

  ngOnInit() {  }

}
