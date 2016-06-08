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
import {HotelsMapComponent} from "./map/hotels-map.component";
import {TabsComponent} from "./../tabs/tabs.component.ts";
import {TabComponent} from "./../tabs/tab.component.ts";

@Component({
  selector: 'hotels',
  directives: [MaterializeDirective, HotelsMapComponent, TabsComponent, TabComponent],
  providers: [],
  pipes: [FilterPipe, CountryFilterPipe],
  template: require('./hotel-overview.component.html')
})
export class HotelOverviewComponent implements OnInit {
  hotels: Observable<Hotel[]>;
  countries: Observable<string[]>;
  selectedValues = [];

  constructor(private hotelService: HotelService) {
  }

  ngOnInit() {
    this.hotels = this.hotelService.getHotels();
    this.countries = this.hotels
      .flatMap(hotels => Observable.from(hotels))
      .map(hotel => hotel.countryCode)
      .distinct()
      .toArray()
      .map(arr => arr.sort());
  }

  public change(options) {
    this.selectedValues = Array.apply(undefined, options)
      .filter(option => option.selected)
      .map(option => option.value);
  }
}
