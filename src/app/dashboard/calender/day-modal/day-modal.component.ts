import { Component, OnInit, HostBinding, Input, Output, EventEmitter } from '@angular/core';
import { Exit } from 'src/app/models/models';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ApiService } from 'src/app/services/api.service';

declare var moment;

@Component({
  selector: 'app-day-modal',
  templateUrl: './day-modal.component.html',
  styleUrls: ['./day-modal.component.css']
})
export class DayModalComponent implements OnInit {


  constructor(public localStorage: LocalStorageService,
    public api: ApiService) { }
  @Input() isOpenModal: boolean;

  public type: string;

  @Output() getExits = new EventEmitter();

  public min;

  public momentDay;
  public exit: any;

  public isWeekend;

  public overTime = null;

  public errorRequired = { topic: false, desc: false, timeStart: false, duration: false, overTimeDate: false, timeStartOverTime: false, date: false };


  public open(day, type) {

    this.type = type;
    this.isOpenModal = true;

    if (this.type === 'form') {

      this.min = moment().format('YYYY-MM-DD');
  
      this.momentDay = day.moment;
      this.exit = day.exit;
  
      console.log(this.exit);
  
      if (this.exit) {
        this.api.getUserOvertime(this.exit.id).subscribe(res => {
          console.log('ovetime', res);
          this.overTime =  res.data;
          console.log(this.overTime);
        });
      }
    } else if (this.type === 'pdf') {
      this.exit = day;

      console.log(this.exit);
    }

  }

  public close() {
    this.isOpenModal = false;
    this.getExits.emit(true);
    this.overTime = null;
  }

  ngOnInit() {
  }

  public submitCreate(form) {

    const formControls = form['form']['controls'];
    for (let key in formControls) {
      if (!!formControls[key].errors) {
        this.errorRequired[key] = true;
      } else {
        this.errorRequired[key] = false;
      }
    }
    
    const formValue = form.value;
    

  if( form.valid) {


    formValue['idUser'] = this.localStorage.getItem('WorkFlow', 'Session').userId;
    formValue['date'] = this.momentDay.format('YYYY-MM-DD')

    console.log('form Value', formValue);


      this.api.createExit(formValue).subscribe(res=> {
        console.log(res);
        this.close();
      });
    }  

    }


    public submitEdit(form) {
      const formControls = form['form']['controls'];
      for (let key in formControls) {
        if (!!formControls[key].errors) {
          this.errorRequired[key] = true;
        } else {
          this.errorRequired[key] = false;
        }
      }
      
      const formValue = form.value;
      this.isWeekend  =  this.isWeekendDay(formValue['date']);

      if( form.valid && !this.isWeekend) {


    
        formValue['idExit'] = this.exit.id;
        formValue['duration'] = formValue['duration'].substring(0,5)
        formValue['timeStart'] = formValue['timeStart'].substring(0,5)
        formValue['date'] = this.exit.date
        formValue['topic'] = this.exit.topic;

        console.log('form Value', formValue);

        this.api.editExit(formValue).subscribe(res=> {
          console.log(res);
          this.close();
        });
      }  
  
    }

    public isWeekendDay(day) {
      const dayM = moment(day);
      const dow = dayM.day();
      return (dow === 6) || (dow === 0);

    }


    public remove()
    {
      this.api.deleteExit({idExit: this.exit.id}).subscribe(res=> {
        console.log(res);
      });
      this.close();
    }
}