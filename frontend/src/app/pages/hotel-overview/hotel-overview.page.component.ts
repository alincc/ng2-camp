import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/startWith';
import {HotelService} from '../../shared/hotel.service.ts';
import {Hotel} from '../../model/backend-typings';
import {HotelOverviewComponent} from '../../components/hotel-overview/hotel-overview.component';

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

  hotels:Observable<Hotel[]>;

  constructor(private hotelService:HotelService) {
  }

  ngOnInit() {
    this.hotels = this.hotelService.getHotels();
  }

}
