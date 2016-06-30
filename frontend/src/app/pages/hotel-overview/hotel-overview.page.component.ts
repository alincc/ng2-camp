import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/concatAll';
import {HotelService} from '../../shared/hotel.service';
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

  constructor(private hotelService: HotelService) {
  }

  ngOnInit() {
    this.hotelsWithCoordinates = this.hotelService.getHotelsWithCoordinates();
  }

}
