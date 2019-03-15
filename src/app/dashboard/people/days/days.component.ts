import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

declare var moment;

@Component({
  selector: 'app-days',
  templateUrl: './days.component.html',
  styleUrls: ['./days.component.css']
})
export class DaysComponent implements OnInit {


  @Input() days: Array<any>;
  @Input() userId: number;
  @Input() exits: any;
  @Output() openModalDay = new EventEmitter<any>();

  constructor(private api: ApiService) {
   }

  ngOnInit() {
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

  public hover(day) {
  }

  public checkExit(day) {

    if (!!this.exits) {
      const tmp = this.exits.filter(exit => {
        return moment(exit.exitDate).format('L') === day.format('L');
      });
      if (!!tmp.length) {
        return tmp.pop().status;
      } else {
        return -1;
      }
    } else {
      return -1;
    }

  }

  public getInfoDay(day) {
    if (!!this.exits) {
      const tmp = this.exits.filter(exit => {
        return moment(exit.exitDate).format('L') === day.format('L');
      });
      if (!!tmp.length) {
        return tmp.pop();
      }
    }
  }

  public openModal(day) {
    if (!!this.exits) {
      const tmp = this.exits.filter(exit => {
        return moment(exit.exitDate).format('L') === day.format('L');
      });
      if (!!tmp.length) {
        const id =  tmp.pop().id;
        this.api.getExit(id).subscribe(res => {

          const dayObj = {moment: day, exit: res.data};
          this.openModalDay.emit(dayObj);
        });
      }
    }

  }
}
