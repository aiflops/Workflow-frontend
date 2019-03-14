import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../services/local-storage.service';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  public roleUser =  null;
  constructor(private api: ApiService) {
    this.api.getLoginUser().subscribe(res => {
      this.roleUser = res.data.roleId;
      this.api.userInfoSubject.next(res.data);
   });
   }

  ngOnInit() {
  }

}
