import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiInterceptorService } from '../services/api-interceptor.service';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {

  public confirmHash = '';
  public message = '';


  constructor( private route: ActivatedRoute,
    private api: ApiService) {
    this.confirmHash = this.route.snapshot.paramMap.get('hash');
    this.api.acceptExit({'hash' : this.confirmHash}).subscribe(res => {
      this.message = res.message;
    });
  }

  ngOnInit() {


  }
}
