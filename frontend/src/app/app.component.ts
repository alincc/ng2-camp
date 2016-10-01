import {Component, ViewEncapsulation, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app',
  styles: [
    require('./app.scss')
  ],
  encapsulation: ViewEncapsulation.None,
  template: require('./app.template.html')
})
export class App implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit() {
    let auth:string = localStorage.getItem('auth');
    if (auth === 'logged') {
      this.router.navigate(['/']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
