import { Component, OnInit } from '@angular/core';
import { ExitsComponent } from '../exits/exits.component';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.css']
})
export class PermissionsComponent extends ExitsComponent implements OnInit {

  public usersList = new Array<any>();
  public displayMode = 'Wszystkie';
  constructor(public api: ApiService, public router: Router, public localStorage: LocalStorageService) {
    super(api, router, localStorage);

    this.api.getUsers().subscribe(res => {
      this.usersList  = res.data.map( item => {
        return {id: item.id, email: item.email, name: item.firstName + ' ' + item.lastName};
      });
    });
  }

  ngOnInit() {
    this.api.getLoginUser().subscribe(res => {
      if (res.data.roleId === 1) {
        this.router.navigate(['calender']);
      }
    });
  }

  public show(form) {
    let displayModeNumer;

    switch (this.displayMode) {
      case('Wszystkie'):
      displayModeNumer = 10;
      break;
      case('Zatwierdzone'):
      displayModeNumer = 2;
      break;
      case('Zablokowane'):
      displayModeNumer = 1;
      break;
      case('Oczekujące'):
      displayModeNumer = 0;
      break;
      default:
      displayModeNumer = 10;
      break;
    }

    if (form.valid) {
      const jsonForm = form.value;
      // jsonForm['status'] = displayModeNumer;
      console.log(jsonForm);
      this.api.getExitsFromTimeAll(jsonForm).subscribe(res => {
        this.exitsAll = res.data;
        this.changeStatus(this.displayMode);
      });
    }
  }

}
