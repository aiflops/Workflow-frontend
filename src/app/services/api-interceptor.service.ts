import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, empty } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LocalStorageService } from './local-storage.service';
import { Session } from '../models/models';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApiInterceptorService implements HttpInterceptor  {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(this.getRequest(req))
      .pipe(
        catchError((err, caught) => {
          if (err instanceof HttpErrorResponse) {
            switch (err.status) {
              // blad serwera wylogowanie user-a
              case 500:
              alert(err.error.message);
              this.auth.logout();
              break;
              // wygasła sesja user-a
              case 401:
              alert(err.error.message);
              break;

              // widomości 403
              case 403:
              alert(err.error.message);
              break;

              // wiadomości 400
              case 400:
              alert(err.error.message);
              break;

 

            }
          }
          return empty();
        })
      );
  }

  public getRequest(req: HttpRequest<any>): HttpRequest<any> {
    const session: Session = this.localStorage.getItem('WorkFlow', 'Session');
    const isLogin = !!session;


    let reqClone: HttpRequest<any> = null;
    if (isLogin) {
      reqClone = req.clone({
        setHeaders: { 'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Authorization': 'Bearer ' + session.token
      }
      });
    } else {

      reqClone = req.clone({
        setHeaders: { 'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS' }
      });
    }
    return reqClone;
  }
  constructor(private localStorage: LocalStorageService, private auth: AuthService) { }
}
