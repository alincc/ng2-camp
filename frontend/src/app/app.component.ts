import {Component, ViewEncapsulation, OnInit} from "@angular/core";
import {NavigationComponent} from "./components/navigation/navigation.component";
import {HotelsComponent} from "./components/hotel-overview/hotels.component";
import {CrudService} from "./shared/crud.service";
import {HotelService} from "./shared/hotel.service";
import {CountryService} from "./shared/country.service";
import {CampService} from "./shared/camp.service";
import {AuthService} from "./shared/auth.service";

@Component({
  selector: 'app',
  directives: [HotelsComponent, NavigationComponent],
  providers: [CrudService, HotelService, CountryService, CampService, AuthService],
  styles: [
    require('../assets/css/main.scss')
  ],
  encapsulation: ViewEncapsulation.None,
  template: require('./app.template.html')
})
export class App implements OnInit {

  ngOnInit() {

    let auth: string = localStorage.getItem('auth');
    if (auth === 'logged') {
      // this.router.navigate(['/']);
    } else {
      // this.router.navigate(['/login']);
    }
  }
}
