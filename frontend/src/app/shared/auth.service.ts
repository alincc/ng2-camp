import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {tokenNotExpired} from 'angular2-jwt';
import {UrlProvider} from './urlProvider';
import {Router} from "@angular/router";

@Injectable()
export class AuthService {
  constructor(private router: Router,
              private http: Http) {
  }

  public authenticated() {
    return tokenNotExpired();
  }

  public login(username: string, password: string) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.post(UrlProvider.getBackendUrl('/auth/login'), JSON.stringify(
      {
        name: username,
        password: password
      }
    ), {
      headers: headers
    }).subscribe((response) => {
      localStorage.setItem('id_token', response.text());
      localStorage.setItem('username', username);
      this.router.navigate(['/hotels']);
    });
  }

  public logout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('username');
    this.router.navigate(['/login']);
  }

  public getUsername(): string {
    return localStorage.getItem('username');
  }
}
