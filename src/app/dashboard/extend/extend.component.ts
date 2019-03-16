import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

declare var moment;

@Component({
  selector: 'app-extend',
  templateUrl: './extend.component.html',
  styleUrls: ['./extend.component.css']
})
export class ExtendComponent implements OnInit {


  public errorRequired = { id: false, startExtend: false, endExtend: false };
  //  zmienna error
  public error = false;

  public extendPerson = '';
  public usersList = new Array<any>();


  constructor(private api: ApiService) {
    this.api.getUsers().subscribe(res => {
      this.usersList  = res.data.map( item => {
        return {id: item.id, email: item.email, name: item.firstName + ' ' + item.lastName};
      });
      console.log(this.usersList);
    });
   }

  ngOnInit() {
  }

  submit(form) {
    const formControls = form['form']['controls'];
    for (let key in formControls) {
      if (!!formControls[key].errors) {
        this.errorRequired[key] = true;
      } else {
        this.errorRequired[key] = false;
      }
    }
    // moment JS poronanie dat
    console.log(form.value['startExtend'], form.value['endExtend']);
    if (form.valid) {
      // console.log(form.value['startExtend'], form.value['endExtend'] );
    }
  }



}
