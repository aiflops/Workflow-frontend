import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

declare var moment;

@Component({
  selector: 'app-exits',
  templateUrl: './exits.component.html',
  styleUrls: ['./exits.component.css']
})
export class ExitsComponent implements OnInit {

  @ViewChild('dayModal') dayModal;

  public displayMode  = 'Wszystkie';

  public exits = new Array();
  public exitsAll = new Array();

  public errorRequired = { startTime: false, stopTime: false };
  public errorIsBefore = false;

  private fromToDate = null;

  constructor(public api: ApiService) {

    this.api.getUserExits().subscribe(res=>{
      const min = moment();
      this.exits = res.data.filter(el=>{
        return min.isBefore(el.date);
      });
      this.exitsAll = res.data.filter(el=>{
        return min.isBefore(el.date);
      });
      console.log(this.exits);
    });
   }

  ngOnInit() {
  }

  public convertDate(date) {
    return moment(date).format('DD:MM:YYYY');
  }


  public changeStatus(word) {
    switch(word){

      case 'Wszystkie':
        this.displayMode = 'Wszystkie';
        this.exits =  this.exitsAll;
      break;

    case 'Zatwierdzone':
      this.displayMode = 'Zatwierdzone';
      this.exits =  this.exitsAll.filter(exit=> {
        return exit.status === 2;
      });

    break;

    case 'Zablokowane':
      this.displayMode = 'Zablokowane';
      this.exits =  this.exitsAll.filter(exit=> {
        return exit.status === 1;
      });
    break;

    case 'Oczekujące':
      this.displayMode = 'Oczekujące';
      this.exits =  this.exitsAll.filter(exit=> {
        return exit.status === 0;
      });
    break;
    }
   }

   public show(form){
    const formControls = form['form']['controls'];
    for (let key in formControls) {
      if (!!formControls[key].errors) {
        this.errorRequired[key] = true;
      } else {
        this.errorRequired[key] = false;
      }
    }


    if(form.valid)
    {
      if(moment(form.value['startTime']).isBefore(moment(form.value['stopTime']))){
        this.fromToDate = [
          moment(form.value['startTime']).format('YYYY-MM-DD'),
          moment(form.value['stopTime']).format('YYYY-MM-DD')
        ];
        // const fromToDate = [form.value['startTime'],form.value['stopTime']];
        this.api.getUsersExits(this.fromToDate).subscribe(res=>{
          console.log(res);
          this.exitsAll = res.data;
          this.changeStatus(this.displayMode);
        });
      }else {
        this.errorIsBefore = true;
      }
    }
   }

   public details(exit){
        const day = {}
        day['moment'] = moment(exit.date);
        day['exit'] = exit;
    
        this.dayModal.open(day);
   }

   public getExits(event) {
    if(!!this.fromToDate) {
      this.api.getUsersExits(this.fromToDate).subscribe(res=>{
        console.log(res);
        this.exitsAll = res.data;
        this.changeStatus(this.displayMode);
      });
    } else {
      this.api.getUserExits().subscribe(res=>{
        const min = moment();
        this.exits = res.data.filter(el=>{
          return min.isBefore(el.date);
        });
        this.exitsAll = res.data.filter(el=>{
          return min.isBefore(el.date);
        });
        console.log(this.exits);
      });
    }
  }

}
