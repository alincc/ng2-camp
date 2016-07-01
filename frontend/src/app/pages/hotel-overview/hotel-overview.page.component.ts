import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/let';
import {HotelService} from '../../shared/hotel.service.ts';
import {Store} from '@ngrx/store';
import {AppState} from '../../reducers/index';
import {Hotel} from '../../model/backend-typings';
import {HotelOverviewComponent} from '../../components/hotel-overview/hotel-overview.component';
import {HotelWithCoordinate} from '../../model/hotelWithCoordinate';

@Component({
  selector: 'hotel-overview-page',
  directives: [HotelOverviewComponent],
  template: `
    <hotels 
        [hotelsWithCoordinates]="hotelsWithCoordinates">
    </hotels>
    `
})
export class HotelOverviewPageComponent implements OnInit {

  hotelsWithCoordinates: Observable<HotelWithCoordinate[]>;

  constructor(private hotelService:HotelService,
              private store:Store<AppState>) {
  }

  ngOnInit() {
    this.hotels = this.store.select<Hotel[]>('hotels');
    //this.hotels = this.hotelService.getHotels();
  }

}
