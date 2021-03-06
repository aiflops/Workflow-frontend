import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { UserLoginMaker } from 'src/app/models/models';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.css']
})
export class CalenderComponent implements OnInit {

  constructor(private api: ApiService, private localStorage: LocalStorageService, private router: Router ) {
    this.api.getLoginUser().subscribe(res => {
      this.localStorage.setItem('WorkFlow', 'User', UserLoginMaker.create(res.data));
      if (res.data.roleId === 2) {
        this.router.navigate(['people']);
      }
    });
  }

  ngOnInit() {

  }

}
