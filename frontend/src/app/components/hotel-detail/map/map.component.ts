import {Component, Input} from '@angular/core';
import {ANGULAR2_GOOGLE_MAPS_DIRECTIVES, ANGULAR2_GOOGLE_MAPS_PROVIDERS} from 'angular2-google-maps/core';
import {Hotel} from '../../../model/backend-typings';
import {Coordinate} from '../../../model/coordinate';

@Component({
  selector: 'map',
  directives: [ANGULAR2_GOOGLE_MAPS_DIRECTIVES],
  providers: [ANGULAR2_GOOGLE_MAPS_PROVIDERS],
  styles: [`
    .sebm-google-map-container {
      height: 300px;
    }
  `],
  template: require('./map.component.html')
})
export class MapComponent {

  @Input()
  hotel: Hotel;

  @Input()
  coordinate: Coordinate;
}
