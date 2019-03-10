import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AppConfig } from '../models/app.config';
import { iLogin, Exit } from '../models/models';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private urlApi =  AppConfig.urlApi;

  constructor(private http: HttpClient) { }


  public isAuthApi(): Observable<any> {
    return this.http.get(this.urlApi + 'auth/isAuth');
  }

  public getLoginUser(): Observable<any>{
    return this.http.get(this.urlApi + 'user/userLogin');

  }

  public getUsers(): Observable<any>{
    return this.http.get(this.urlApi + 'user/usersAll');
  }

  public createExit(exit){
    return this.http.post(this.urlApi+ 'exit/create', exit);
  }

  public editExit(exit){
    return this.http.put(this.urlApi+ 'exit/edit', exit);
  }

  public deleteExit(exit){
    return this.http.post(this.urlApi+ 'exit/delete', exit);
  }


  public getUserExits(): Observable<any>{
    return this.http.get(this.urlApi+ 'exit/getUserExits');
  }


  public getUserOvertime(overtime): Observable<any>{
    return this.http.get(this.urlApi+ 'overtime/get/' + overtime);
  }


  public getUsersExits(fromToDate): Observable<any>{
    const params = new HttpParams()
    .set('startTime', fromToDate[0])
    .set('stopTime', fromToDate[1]);
    return this.http.get(this.urlApi+ 'exit/getUsersExits', {params: params});
  }

}
