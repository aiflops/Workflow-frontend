import { Component, OnInit, HostBinding, Input, Output, EventEmitter } from '@angular/core';
import { Exit } from 'src/app/models/models';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ApiService } from 'src/app/services/api.service';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';



declare const moment;

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

  public errorRequired = {
     topic: false, desc: false, timeStart: false, duration: false, overTimeDate: false, timeStartOverTime: false, date: false };
  public endofexit = null;

  public open(day, type) {

    this.type = type;
    this.isOpenModal = true;

    if (this.type === 'form') {

      this.min = moment().format('YYYY-MM-DD');
  
      this.momentDay = day.moment;
      this.exit = day.exit;
  
  
      if (this.exit) {
        this.api.getUserOvertime(this.exit.id).subscribe(res => {
          this.overTime =  res.data;
        });
      }
    } else if (this.type === 'pdf') {
      this.exit = day;
      const datatime = moment(this.exit.exit.date + ' ' + this.exit.exit.time_start, 'YYYY-MM-DD HH:mm:ss');
      const duration = moment(this.exit.exit.date + ' ' + this.exit.exit.duration, 'YYYY-MM-DD HH:mm:ss' );
      const minute = duration.format('mm');
      const hours = duration.format('HH');
      datatime.add(hours, 'hours');
      datatime.add(minute, 'minutes');
      this.endofexit = datatime.format('HH:mm');
    } else if (this.type === 'display') {
      this.min = moment().format('YYYY-MM-DD');
      this.momentDay = day.moment;
      this.exit = day.exit;
      if (this.exit) {
        this.api.getUserOvertime(this.exit.id).subscribe(res => {
          this.overTime =  res.data;
        });
      }
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

  if ( form.valid) {


    formValue['idUser'] = this.localStorage.getItem('WorkFlow', 'Session').userId;
    formValue['date'] = this.momentDay.format('YYYY-MM-DD')

    this.api.createExit(formValue).subscribe(res=> {
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

      if ( form.valid && !this.isWeekend) {

        formValue['idExit'] = this.exit.id;
        formValue['duration'] = formValue['duration'].substring(0, 5);
        formValue['timeStart'] = formValue['timeStart'].substring(0, 5);
        formValue['date'] = this.exit.date;
        formValue['topic'] = this.exit.topic;


        this.api.editExit(formValue).subscribe(res => {
          this.close();
        });
      }

    }

    public isWeekendDay(day) {
      const dayM = moment(day);
      const dow = dayM.day();
      return (dow === 6) || (dow === 0);

    }


    public remove() {
      this.api.deleteExit({idExit: this.exit.id}).subscribe(res => {
        this.close();
      }).add(() => {

      }
      );
    }

  public captureScreen() {
    const data = document.getElementById('contentToConvert');
    html2canvas(data).then(canvas => {

      const imgWidth = 208;
      const pageHeight = 295;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      const heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png');
      let pdf = new jspdf('p', 'mm', 'a4');
      const position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      pdf.save('wyjscie.pdf');
    });
  }
}
