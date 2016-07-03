import {Component, ViewEncapsulation, OnInit} from '@angular/core';
import {NavigationComponent} from './components/navigation/navigation.component';
import {HotelOverviewComponent} from './components/hotel-overview/hotel-overview.component';
import {MarkdownConverter} from './components/markdown/markDownConverter';
import {StoreLogMonitorComponent} from '@ngrx/store-log-monitor';

@Component({
  selector: 'app',
  directives: [HotelOverviewComponent, NavigationComponent, StoreLogMonitorComponent],
  providers: [MarkdownConverter],
  styles: [
    require('./app.scss')
  ],
  encapsulation: ViewEncapsulation.None,
  template: require('./app.template.html')
})
export class App implements OnInit {

  ngOnInit() {

    let auth:string = localStorage.getItem('auth');
    if (auth === 'logged') {
      // this.router.navigate(['/']);
    } else {
      // this.router.navigate(['/login']);
    }
  }
}
