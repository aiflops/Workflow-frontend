import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, RoutesRecognized } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'tauronWorkFlow';

  public href: string = "";
  public menuVisible = false;

  constructor(private location: Location, private route: Router) {
    // this.href = this.location.path();

    this.route.events.subscribe(event => {
      if (event instanceof RoutesRecognized) {
        const routeData = event.state.root.firstChild;
        this.menuVisible = routeData.data['barVisible'];
        console.log(this.menuVisible);
      }
    });
  }

  ngOnInit() {}
}
