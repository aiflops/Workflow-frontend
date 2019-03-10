import { Injectable } from '@angular/core';
import { AppConfig } from '../models/app.config';
import { iLogin, SessionMaker } from '../models/models';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from './local-storage.service';
import { Router } from '@angular/router';
import { ApiService } from './api.service';
import { pipe } from '@angular/core/src/render3';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private urlApi =  AppConfig.urlApi;

  constructor(private http: HttpClient,
     private localStorage: LocalStorageService,
     private router: Router,
     private api: ApiService) { }

  public login ( login: iLogin): void {
    this.localStorage.removeItem('WorkFlow', 'Session');
    this.localStorage.removeItem('WorkFlow', 'User');

    this.http.post(this.urlApi + 'auth/login', login).subscribe(res => {
      const session = SessionMaker.create(res['data']);
      this.localStorage.setItem('WorkFlow', 'Session', session);
      this.router.navigateByUrl('/calender');
    })
  }

  public changePassword ( email ): Observable<any> {
    this.localStorage.removeItem('WorkFlow', 'Session');
    this.localStorage.removeItem('WorkFlow', 'User');
    
    return this.http.post(this.urlApi + 'auth/resetPassword', email);
  }

    /**
 * funkcja powoduje wylogowanie, czyli wyczyszczenie z pamięci operacyjnej
 * oraz fizycznej obiektu sesji logowania
 * parametr to opcje wylogowania wiadomość
 *
 */
public logout(): void {
  this.localStorage.removeItem('WorkFlow', 'Session');
  this.localStorage.removeItem('WorkFlow', 'User');

  this.router.navigate(['login']);
}
}
