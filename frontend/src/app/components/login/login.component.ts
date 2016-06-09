import {Component} from '@angular/core';
import {AuthService} from '../../shared/auth.service';
import {MaterializeDirective} from 'angular2-materialize';

@Component({
  selector: 'login',
  directives: [MaterializeDirective],
  providers: [],
  template: require('./login.component.html')
})
export class LoginComponent {

  private username: string = 'user';
  private password: string = 'password';

  constructor(private auth: AuthService) {
  }

  doLogin() {
    this.auth.login(this.username, this.password);
    this.username = 'user';
    this.password = 'password';
  }

  doLogout() {
    this.auth.logout();
    this.username = 'user';
    this.password = 'password';
  }

  invalid(): boolean {
    return this.username === '' || this.password === '';
  }
}
