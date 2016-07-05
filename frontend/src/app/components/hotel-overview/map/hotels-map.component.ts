import {Component, Input, ChangeDetectionStrategy} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ANGULAR2_GOOGLE_MAPS_DIRECTIVES} from 'angular2-google-maps/core';
import {Hotel} from '../../../model/backend-typings';

@Component({
  selector: 'hotels-map',
  directives: [ANGULAR2_GOOGLE_MAPS_DIRECTIVES],
  styles: [`
    .sebm-google-map-container {
      height: 500px;
    }
  `],
  template: require('./hotels-map.component.html'),
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HotelsMapComponent {

  @Input()
  hotels: Observable<Hotel[]>;

}

