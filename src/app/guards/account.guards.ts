import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { LocalStorageService } from '../services/local-storage.service';


/**
 * Guard – czyli strzeżemy swoje dane. Ten mechanizm nam to umożliwi.
 * Guard jest mechanizmem, który definiuje się w sekcji routingu aplikacji.
 * Sam mechanizm obsługuje zdarzenie:
 * CanActivate – decyduje czy można nawigować pod dany url
  */

@Injectable({
  providedIn: 'root'
})

/** Gurad będzie  pozwalał na przejscie do stony
 *  jesli użytkownik jest zalogowany
 *  w innym przypadku jeśli przekieruje do start
 * */
export class AccountGuard implements CanActivate {
  canActivate( next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {


    const isLogin = !!this.localStorage.getItem('WorkFlow', 'Session');

    if (isLogin) {
        return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }

  }
    constructor(private auth: AuthService, private router: Router, private localStorage: LocalStorageService) {
  }
}
