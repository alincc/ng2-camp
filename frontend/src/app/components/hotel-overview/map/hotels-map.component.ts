import {Component, Input, OnInit} from '@angular/core';
import {ANGULAR2_GOOGLE_MAPS_DIRECTIVES, ANGULAR2_GOOGLE_MAPS_PROVIDERS} from 'angular2-google-maps/core';
import {MapService} from '../../../shared/map/map.service';
import {Hotel} from '../../../model/backend-typings';
import {Observable} from "rxjs/Observable";


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


  @Input('hotels') hotels: Observable<Hotel[]>;

  coordinates: HotelWithCoordinates[] = [];

  constructor(private mapService: MapService) {
  }

  ngOnInit() {
    this.hotels
      .flatMap(hotels => Observable.from(hotels))
      .forEach(hotel => this.mapService.getCoordinates(hotel).subscribe(coordinate => {
      this.coordinates.push(new HotelWithCoordinates(hotel.id, hotel.name, coordinate.lat, coordinate.lng));
    }));
  }
}

class HotelWithCoordinates {
  public constructor(public id: number, public name: string, public lat: number, public lng: number) {}
}
