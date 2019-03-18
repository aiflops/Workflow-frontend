import { Component, OnInit } from '@angular/core';
import { ExitsComponent } from '../exits/exits.component';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.css']
})
export class PermissionsComponent extends ExitsComponent implements OnInit {

  public usersList = new Array<any>();
  constructor(public api: ApiService, public router: Router) {
    super(api, router);

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

}
