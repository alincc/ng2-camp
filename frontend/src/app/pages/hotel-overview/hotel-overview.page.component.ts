import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Store} from '@ngrx/store';
import {AppState, getHotels} from '../../reducers/index';
import {HotelOverviewComponent} from '../../components/hotel-overview/hotel-overview.component';
import {Hotel} from '../../model/backend-typings';

@Component({
  selector: 'hotel-overview-page',
  directives: [HotelOverviewComponent],
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
