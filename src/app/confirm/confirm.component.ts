import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {

  public confirmHash = '';

  constructor( private route: ActivatedRoute) {
    this.confirmHash = this.route.snapshot.paramMap.get('hash');
  }

  ngOnInit() {

  }
}
