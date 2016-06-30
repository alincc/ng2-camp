import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/concatAll';
import {HotelService} from '../../shared/hotel.service';
import {MapService} from '../../shared/map.service';
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

  constructor(private hotelService: HotelService,
              private mapService: MapService) {
  }

  ngOnInit() {
    this.hotelsWithCoordinates = this.hotelService.getHotels()
      .map((hotels: Hotel[]) => Observable.from(hotels)
        .map(hotel => this.getCoordinate(hotel))
        .concatAll()
        .toArray())
      .concatAll();
  }

  getCoordinate(hotel: Hotel): Observable<HotelWithCoordinate> {
    return this.mapService.getCoordinate(hotel)
      .map(coordinate => new HotelWithCoordinate(hotel, coordinate));
  }
}
