import {Component, Input, OnInit} from '@angular/core';
import {Hotel, Country} from '../../model/backend-typings';
import {HotelService} from '../../shared/hotel.service';
import {RouteParams, Router} from '@ngrx/router';
import {CountryService} from '../../shared/country.service';
import {MaterializeDirective} from 'angular2-materialize';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'hotel-edit',
  directives: [MaterializeDirective],
  providers: [],
  template: require('./hotel-edit.component.html')
})
export class HotelEditComponent implements OnInit {
  // TODO: get hotel via input instead of loading it anew via id
  @Input('hotel') hotelInput: Hotel;
  hotel: Hotel;
  hotelId: Observable<number>;
  countries: Country[];

  constructor(private hotelService: HotelService,
              private countryService: CountryService,
              private router: Router,
              routeParams: RouteParams) {
    this.hotelId = routeParams.pluck<number>('id');
  }

  ngOnInit() {
    this.countryService
      .getAllCountries()
      .subscribe((countries:Country[]) => { this.countries = countries; });
    this.hotel = (this.hotelInput) ? this.hotelInput : {};
    // look for 'id' in path params, and if it is a number go and fetch according hotel from hotelService
    // do not do that if id is not a number, i.e. stick with empty hotel instance
    this.hotelId
      .filter(id => !isNaN(id))
      .flatMap(id => this.hotelService.getHotel(id))
      .subscribe(hotel => { this.hotel = hotel; });
  }

  saveHotel() {
    this.hotelService.saveHotel(this.hotel).subscribe(hotel =>
      this.openHotel(hotel));
  }

  openHotel(hotel: Hotel) {
    this.router.go('/hotels/' + hotel.id);
  }
}
