import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


const ACCESS_TOKEN = 'token';
const IS_AUTH = 'is_auth';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private BASE_URL = environment.BASE_URL;
  private _isAuthenticated = false;

  get isAuthicated() {
    return this._isAuthenticated;
  }
  set isAuthicated(isAuthicated: boolean) {
    this._isAuthenticated = isAuthicated
  }

  constructor(private httpClient: HttpClient) { }

  getTokenLocalStr(): any {
    return localStorage.getItem(ACCESS_TOKEN);
  }
  saveTokenLocalStr(token: string): void {
    localStorage.setItem(ACCESS_TOKEN, token);
  }

  getIsAuthFromLocalStr() {
    return localStorage.getItem(IS_AUTH);

  }

  saveIsAuthToLocalStr(isAuth: string) {
    localStorage.setItem(IS_AUTH, isAuth);

  }

  login(userCredintails: FormData): Observable<any> {
    return this.httpClient.post(`${this.BASE_URL}/login/`, userCredintails).pipe(
      tap((res: any) => {
        const token = res.message.token
        this.saveTokenLocalStr(token)
        this.isAuthicated = true;
        this.saveIsAuthToLocalStr('true');
      })
    );
  }
}
