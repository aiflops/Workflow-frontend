import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-refuse',
  templateUrl: './refuse.component.html',
  styleUrls: ['./refuse.component.css']
})
export class RefuseComponent implements OnInit {

  public refuseHash = '';

  constructor( private route: ActivatedRoute) {
    this.refuseHash = this.route.snapshot.paramMap.get('hash');
  }

  ngOnInit() {}

}
