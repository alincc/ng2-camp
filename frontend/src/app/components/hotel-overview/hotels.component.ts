import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/toArray';
import 'rxjs/add/operator/distinct';
import {HotelService} from './../../shared/hotel.service.ts';
import {Hotel} from '../../model/backend-typings';
import FilterPipe from '../hotel.filter.pipe.ts';
import {MaterializeDirective} from 'angular2-materialize/dist/index';
import CountryFilterPipe from '../country.filter.pipe';

@Component({
  selector: 'hotels',
  directives: [MaterializeDirective],
  providers: [],
  pipes: [FilterPipe, CountryFilterPipe],
  template: require('./hotels.component.html')
})
export class HotelsComponent implements OnInit {
  hotels: Observable<Hotel[]>;
  countries: Observable<string[]>;
  private selectedValues = [];

  constructor(private hotelService: HotelService) {
  }

  ngOnInit() {
    this.hotels = this.hotelService.getHotelsAuthenticated();
    this.countries = this.hotels
      .flatMap(hotels => Observable.from(hotels))
      .map(hotel => hotel.countryCode)
      .distinct()
      .toArray()
      .map(arr => arr.sort());
  }

  public change(options) {
    this.selectedValues = Array.apply(null, options)  // convert to real Array
      .filter(option => option.selected)
      .map(option => option.value);

    console.log(this.selectedValues);
  }
}
