import {Component, Input, OnInit} from '@angular/core';
import {ANGULAR2_GOOGLE_MAPS_DIRECTIVES, ANGULAR2_GOOGLE_MAPS_PROVIDERS} from 'angular2-google-maps/core';
import {MapService} from '../../../shared/map/map.service';
import {Hotel} from '../../../model/backend-typings';
import {Observable} from 'rxjs/Observable';


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
  hotels: Hotel[];

  coordinates: HotelWithCoordinates[] = [];

  constructor(private mapService: MapService) {
  }

  ngOnInit() {
    this.hotels
      .forEach((hotel: Hotel) =>
        this.mapService.getCoordinates(hotel)
          .subscribe(coordinate => {
            this.coordinates.push({
              id: hotel.id,
              name: hotel.name,
              lat: coordinate.lat,
              lng: coordinate.lng
            });
          }));
  }
}

interface HotelWithCoordinates {
  id: number;
  name: string;
  lat: number;
  lng: number;
}
