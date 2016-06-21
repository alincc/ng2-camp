import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/concatAll';
import 'rxjs/add/operator/toArray';
import 'rxjs/add/observable/from';
import {ANGULAR2_GOOGLE_MAPS_DIRECTIVES, ANGULAR2_GOOGLE_MAPS_PROVIDERS} from 'angular2-google-maps/core';
import {MapService} from '../../../shared/map/map.service';
import {Hotel} from '../../../model/backend-typings';

@Component({
  selector: 'hotels-map',
  directives: [ANGULAR2_GOOGLE_MAPS_DIRECTIVES],
  providers: [ANGULAR2_GOOGLE_MAPS_PROVIDERS, MapService],
  styles: [`
    .sebm-google-map-container {
      height: 500px;
    }
  `],
  template: require('./hotels-map.component.html')
})
export class HotelsMapComponent implements OnInit {

  @Input()
  hotels: Observable<Hotel[]>;

  hotelsWithCoordinates: Observable<HotelWithCoordinates[]>;

  constructor(private mapService: MapService) {
  }

  ngOnInit() {
    this.hotelsWithCoordinates = this.hotels
      .map((hotels: Hotel[]) => Observable.from(hotels)
        .map(hotel => this.getCoordinate(hotel))
        .concatAll()
        .toArray())
      .concatAll();
  }

  getCoordinate(hotel: Hotel): Observable<HotelWithCoordinates> {
    return this.mapService.getCoordinate(hotel)
      .map(coordinate => new HotelWithCoordinates(hotel.id, hotel.name, coordinate.lat, coordinate.lng));
  }
}

class HotelWithCoordinates {
  constructor(public id: number,
              public name: string,
              public lat: number,
              public lng: number) {
  }
}

