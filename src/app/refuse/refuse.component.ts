import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-refuse',
  templateUrl: './refuse.component.html',
  styleUrls: ['./refuse.component.css']
})
export class RefuseComponent implements OnInit {

  public refuseHash = '';

  public message = '';


  constructor( private route: ActivatedRoute,
    private api: ApiService) {
    this.refuseHash = this.route.snapshot.paramMap.get('hash');
    this.api.refuseExit({'hash' : this.refuseHash}).subscribe(res => {
      this.message = res.message;
    });
  }

  ngOnInit() {
  }



}
