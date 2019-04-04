import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AppConfig } from '../models/app.config';
import { iLogin, Exit } from '../models/models';
import { Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private urlApi =  AppConfig.urlApi;

  constructor(private http: HttpClient) { }

  public userInfoSubject = new Subject();

  public isAuthApi(): Observable<any> {
    return this.http.get(this.urlApi + 'auth/isAuth');
  }

  public getLoginUser(): Observable<any> {
    return this.http.get(this.urlApi + 'user/userLogin');

  }

  public getUsers(): Observable<any> {
    return this.http.get(this.urlApi + 'user/usersAll');
  }

  /** wysyłanie mail */
  public createExit(exit) {
    return this.http.post(this.urlApi + 'exit/create', exit);
  }

  /** wysyłanie mail */
  public editExit(exit) {
    return this.http.put(this.urlApi + 'exit/edit', exit);
  }

  public deleteExit(exit) {
    return this.http.post(this.urlApi +  'exit/delete', exit);
  }


  public getUserExits(): Observable<any> {
    return this.http.get(this.urlApi + 'exit/getUserExits');
  }

  public getUserExits2(formData): Observable<any> {
    const params = new HttpParams()

    .set('startTime', formData[0])
    .set('stopTime', formData[1])
    .set('idUser', formData[2]);

    return this.http.get(this.urlApi + 'exit/getUserExits2', {params: params});
  }

  public usersTimetables(): Observable<any> {
    return this.http.get(this.urlApi + 'user/usersTimetables');
  }
  public getUserOvertime(overtime): Observable<any> {
    return this.http.get(this.urlApi + 'overtime/get/' + overtime);
  }


  public getUsersExits(fromToDate): Observable<any> {
    const params = new HttpParams()
    .set('startTime', fromToDate[0])
    .set('stopTime', fromToDate[1]);
    return this.http.get(this.urlApi + 'exit/getUsersExits', {params: params});
  }

  public getExit(id): Observable<any> {
    const params = new HttpParams()
    .set('idExit', id);
    return this.http.get(this.urlApi + 'exit/get', {params: params});
  }

  public setDeputy(deputy): Observable<any> {
    return this.http.post(this.urlApi + 'user/setDeputy', deputy);
  }

  public getExitsFromTimeAll(jsonData): Observable<any> {
    return this.http.get(this.urlApi + 'exit/getExitsFromTime');
  }
  public getExitsFromTimeWithStatus(jsonData): Observable<any> {
    return this.http.get(this.urlApi + 'exit/getExitsFromTimeWithStatus');
  }

  public acceptExit(jsonData): Observable<any> {
    return this.http.post(this.urlApi + 'exit/accept', jsonData);
  }

  public refuseExit(jsonData): Observable<any> {
    return this.http.post(this.urlApi + 'exit/refuse', jsonData);
  }

}
