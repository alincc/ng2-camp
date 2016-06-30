import {Component, OnInit, Input} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/startWith';
import {Camp, Hotel} from '../../model/backend-typings';
import {MaterializeDirective} from 'angular2-materialize/dist/index';
import {HotelsMapComponent} from './map/hotels-map.component';
import {HotelsTableComponent} from './table/hotels-table.component';
import {HotelWithCoordinate} from '../../model/hotelWithCoordinate';

@Component({
  selector: 'hotels',
  directives: [MaterializeDirective, HotelsMapComponent, HotelsTableComponent],
  providers: [],
  template: require('./hotel-overview.component.html')
})
export class HotelOverviewComponent implements OnInit {

  @Input()
  hotelsWithCoordinates: Observable<HotelWithCoordinate[]>;

  @Input()
  camp: Camp;

  stringFilterSubject: Subject<string> = new Subject<string>();
  countryFilterSubject: Subject<string[]> = new Subject<string[]>();

  countryCodes: Observable<string[]>;
  hotelsWithCoordinatesFiltered: Observable<Hotel[]>;
  hotelsFiltered: Observable<Hotel[]>;

  ngOnInit() {
    let stringFilter: Observable<string> = this.stringFilterSubject.asObservable().startWith('');
    let countryFilter: Observable<string[]> = this.countryFilterSubject.asObservable().startWith([]);
    this.hotelsWithCoordinatesFiltered = Observable.combineLatest(this.hotelsWithCoordinates, stringFilter, countryFilter)
      .map(data => {
        let hotels: HotelWithCoordinate[] = data[0];
        let filterInput: string = data[1];
        let countries: string[] = data[2];

        return hotels.filter(hotelWithCoordinate => this.hotelContainsString(hotelWithCoordinate.hotel, filterInput))
          .filter(hotelWithCoordinate => this.hotelIsInCountries(hotelWithCoordinate.hotel, countries));
      });
    this.hotelsFiltered = this.hotelsWithCoordinatesFiltered
      .flatMap((hotelWithCoordinates: HotelWithCoordinate[]) => Observable.from(hotelWithCoordinates))
      .map((hotelWithCoordinate: HotelWithCoordinate) => hotelWithCoordinate.hotel)
      .toArray();
    this.countryCodes = this.hotelsFiltered
      .flatMap((hotels: Hotel[]) => Observable.from(hotels))
      .map((hotel: Hotel) => hotel.countryCode)
      .distinct()
      .toArray()
      .map((codes: string[]) => codes.sort());

  }

  hotelContainsString(hotel: Hotel, filterInput: string): boolean {
    let filter = filterInput ? filterInput.trim().toLocaleLowerCase() : '';
    return (hotel.name ? hotel.name.toLocaleLowerCase().includes(filter) : false) ||
      (hotel.description ? hotel.description.toLocaleLowerCase().includes(filter) : false) ||
      (hotel.city ? hotel.city.toLocaleLowerCase().includes(filter) : false);
  }

  hotelIsInCountries(hotel: Hotel, countries: string[]): boolean {
    return countries.length === 0 || countries.includes(hotel.countryCode);
  }

  countrySelectionChanged(options) {
    let selectedCountries = Array.apply(undefined, options)
      .filter(option => option.selected)
      .map(option => option.value)
      .filter(option => option !== '');
    this.countryFilterSubject.next(selectedCountries);
  }

  hotelFilterChanged(event: any) {
    this.stringFilterSubject.next(event.target.value);
  }
}
