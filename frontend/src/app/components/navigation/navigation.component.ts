import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../shared/auth.service';
import {MaterializeDirective} from "angular2-materialize/dist/index";

@Component({
  selector: 'navigation',
  directives: [MaterializeDirective],
  providers: [],
  template: require('./navigation.component.html')
})
export class NavigationComponent implements OnInit {

  username: string = 'test';

  constructor(private auth: AuthService) {
  }

  ngOnInit() {
    this.username = this.auth.getUsername();
  }

  logout() {
    this.auth.logout();
  }
}
