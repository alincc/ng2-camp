import {Component, OnInit, Input} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/concatAll';
import 'rxjs/add/operator/toArray';
import {Camp, Hotel} from '../../model/backend-typings';

@Component({
  selector: 'hotels',
  template: require('./hotel-overview.component.html')
})
export class HotelOverviewComponent implements OnInit {

  @Input()
  camp: Camp;
  @Input()
  hotels: Observable<Hotel[]>;

  stringFilterSubject:Subject<string> = new Subject<string>();
  countryFilterSubject:Subject<string[]> = new Subject<string[]>();

  countryCodes: Observable<string[]>;
  hotelsFiltered: Observable<Hotel[]>;

  ngOnInit() {
    let stringFilter: Observable<string> = this.stringFilterSubject.asObservable().startWith('');
    let countryFilter: Observable<string[]> = this.countryFilterSubject.asObservable().startWith([]);

    this.hotelsFiltered = Observable.combineLatest(this.hotels, stringFilter, countryFilter)
      .map(data => {
        let hotels: Hotel[] = data[0];
        let filterInput: string = data[1];
        let countries: string[] = data[2];

        return hotels.filter(hotel => this.hotelContainsString(hotel, filterInput))
          .filter(hotel => this.hotelIsInCountries(hotel, countries));
      });
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
