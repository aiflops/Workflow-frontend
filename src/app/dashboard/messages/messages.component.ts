import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  constructor(public api: ApiService, private router: Router) {
    this.api.getLoginUser().subscribe(res => {
      if (res.data.roleId === 2) {
        this.router.navigate(['people']);
      }
    });
   }

  ngOnInit() {
  }

}
