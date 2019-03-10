import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { iLogin } from '../models/models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

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
      const login: iLogin = {email : null, password: null};
      login.email = formControls['uname'].value;
      login.password = formControls['psw'].value;
      this.auth.login(login);
    }
  }

}
