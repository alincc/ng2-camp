import {Component, OnInit} from '@angular/core';
import {Hotel, Country} from '../../model/backend-typings';
import {HotelService} from '../../shared/hotel.service';
import {Router} from '@ngrx/router';
import {CountryService} from '../../shared/country.service';
import {MaterializeDirective} from 'angular2-materialize';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'hotel-new',
  directives: [MaterializeDirective],
  providers: [HotelService, CountryService],
  template: require('./hotel-new.component.html')
})
export class HotelNewComponent implements OnInit {
  hotel: Hotel;
  countries: Country[];

  constructor(private hotelService: HotelService,
              private countryService: CountryService,
              private router: Router) {
    this.hotel = {} as Hotel;
  }

  ngOnInit() {
    this.countryService.getCountriesAuthenticated().subscribe(c =>{
      this.countries = c;
    });
  }

  saveHotel() {
    this.hotelService.saveHotel(this.hotel).subscribe(data =>
      this.openHotel(data));
  }

  openHotel(hotel: Hotel) {
    this.router.go('/hotels/' + hotel.id);
  }
}
