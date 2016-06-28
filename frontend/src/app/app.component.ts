import {Component, ViewEncapsulation, OnInit} from '@angular/core';
import {NavigationComponent} from './components/navigation/navigation.component';
import {HotelOverviewComponent} from './components/hotel-overview/hotel-overview.component';
import {CrudService} from './shared/crud.service';
import {HotelService} from './shared/hotel.service';
import {CountryService} from './shared/country.service';
import {CampService} from './shared/camp.service';
import {AuthService} from './shared/auth.service';
import {RatingService} from './shared/rating.service';
import {OfferRequestService} from './shared/offer-request.service';
import {MailTemplateService} from './shared/mailtemplate.service';
import {MarkdownConverter} from './components/markdown/markDownConverter';
import {CachedCrudService} from './shared/cached-crud.service';
import {MapService} from './shared/map.service';
import {OfferService} from './shared/offer.service';

@Component({
  selector: 'app',
  directives: [HotelOverviewComponent, NavigationComponent],
  providers: [CrudService, CachedCrudService, HotelService, CountryService, CampService, OfferService,
    AuthService, OfferRequestService, RatingService, MailTemplateService, MarkdownConverter, MapService],
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
