import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  /**
   * Uwagi: ustawiony prefix to 'WorkFlow'
   *
   */
  private separator = '_';

  constructor() {
  }

  public setItem(prefix: string, key: string, value: any): void {
    window.localStorage.setItem(prefix + this.separator + key, JSON.stringify(value));
  }

  public removeItem(prefix: string, key: string) {
    window.localStorage.removeItem(prefix + this.separator + key);
  }

  public hasItem(prefix: string, key: string): boolean {
    return window.localStorage.getItem(prefix + this.separator + key) !== null;
  }

  public getItem(prefix: string, key: string): any {
    return JSON.parse(window.localStorage.getItem(prefix + this.separator + key));
  }

  public createFullPrefix(basePrefix: string, path: Array<string> = []): string {
    if (path.length > 0) {
      return basePrefix + this.separator + path.join(this.separator);
    }
    return basePrefix;
  }

    /**
   * funkcja zprawdza czy uzytkownik jest zalogowany
   * zwraca true jesli jest, false jesli nie
   */
  public isUserLogin (): boolean {
    return !!this.getItem('WorkFlow', 'Session');
  }

  public getUser(): any {
    return this.getItem('WorkFlow', 'User');
  }

}
