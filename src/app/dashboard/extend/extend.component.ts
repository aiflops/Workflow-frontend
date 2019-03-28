import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { forkJoin } from 'rxjs';
import { Router } from '@angular/router';

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


  constructor(private api: ApiService, private router: Router) {
    this.api.getLoginUser().subscribe(res => {
      if (res.data.roleId === 1) {
        this.router.navigate(['calender']);
      }
    });


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

    // RAFAL
    // moment JS poronanie dat
    console.log(form.value['startExtend'], form.value['endExtend']);
    if (form.valid) {
      // console.log(form.value['startExtend'], form.value['endExtend'] );
      const setDeputy = this.api.setDeputy(form.value);
      const getUsers =  this.api.getUsers();

      setDeputy.subscribe(res => {
        alert('Nadano prawa dla uzytkownika');
        getUsers.subscribe(res1 => {
          this.usersList  = res1.data.map( item => {
            return {id: item.id, email: item.email, name: item.firstName + ' ' + item.lastName};
          });
        });

      });

    }
  }



}
