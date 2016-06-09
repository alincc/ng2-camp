import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../shared/auth.service';

@Component({
  selector: 'navigation',
  directives: [],
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
