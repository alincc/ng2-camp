import {Component, Input, ChangeDetectionStrategy} from '@angular/core';
import {ANGULAR2_GOOGLE_MAPS_DIRECTIVES} from 'angular2-google-maps/core';
import {Hotel} from '../../../model/backend-typings';

@Component({
  selector: 'map',
  directives: [ANGULAR2_GOOGLE_MAPS_DIRECTIVES],
  styles: [`
    .sebm-google-map-container {
      height: 300px;
    }
  `],
  template: require('./map.component.html'),
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapComponent {

  @Input()
  hotel: Hotel;
}
