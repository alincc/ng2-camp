import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Store} from '@ngrx/store';
import {AppState, getHotels} from '../../reducers/index';
import {Hotel} from '../../model/backend-typings';

@Component({
  selector: 'hotel-overview-page',
  template: `
    <hotels 
        [hotels]="hotels">
    </hotels>
    `
})
export class HotelOverviewPageComponent implements OnInit {

  hotels: Observable<Hotel[]>;

  constructor(private store:Store<AppState>) {
  }

  ngOnInit() {
    this.hotels = this.store.let(getHotels());
  }

}
