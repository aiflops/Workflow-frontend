import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  public errorRequired = { psw: false, uname: false };

  constructor(private auth: AuthService) { }
  ngOnInit() {}

  public submit(form) {
    const formControls = form['form']['controls'];
    for (let key in formControls) {
      if (!!formControls[key].errors) {
        this.errorRequired[key] = true;
      } else {
        this.errorRequired[key] = false;
      }
    }

    if (form.valid) {
      // todo api request
      this.auth.changePassword({email: formControls['uname'].value}).subscribe(res => {
      });
    }
  }

}
