import {Component, Input, OnInit} from '@angular/core';
import {ANGULAR2_GOOGLE_MAPS_DIRECTIVES, ANGULAR2_GOOGLE_MAPS_PROVIDERS} from 'angular2-google-maps/core';
import {MapService} from '../../../shared/map/map.service';
import {Hotel} from '../../../model/backend-typings';
import {Coordinate} from '../../../shared/map/coordinate';


@Component({
  selector: 'map',
  directives: [ANGULAR2_GOOGLE_MAPS_DIRECTIVES],
  providers: [ANGULAR2_GOOGLE_MAPS_PROVIDERS, MapService],
  styles: [`
    .sebm-google-map-container {
      height: 300px;
    }
  `],
  template: require('./map.component.html')
})
export class MapComponent implements OnInit {


  @Input('hotel') hotel: Hotel;

  coordinate: Coordinate;

  constructor(private mapService: MapService) {
  }

  ngOnInit() {
    this.mapService.getCoordinates(this.hotel).subscribe(coordinate => {
      this.coordinate = coordinate
    });
  }
}
