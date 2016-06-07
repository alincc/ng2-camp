import {Component, OnInit} from '@angular/core';
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
  hotelId: Observable<number>;
  hotel: Hotel = {};
  countries: Observable<Country[]>;

  constructor(private hotelService: HotelService,
              private countryService: CountryService,
              private router: Router,
              routeParams: RouteParams) {
    this.hotelId = routeParams.pluck<number>('id');
  }

  ngOnInit() {
    this.hotelId.flatMap(id => this.hotelService.getHotel(id)).subscribe(hotel => {
      this.hotel = hotel;
    });
    this.countries = this.countryService.getAllCountries();
  }

  saveHotel() {
    this.hotelService.saveHotel(this.hotel).subscribe(hotel =>
      this.openHotel(hotel));
  }

  openHotel(hotel: Hotel) {
    this.router.go('/hotels/' + hotel.id);
  }
}
