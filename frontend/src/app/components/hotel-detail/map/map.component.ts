import {Component, Input, ChangeDetectionStrategy} from '@angular/core';
import {Hotel} from '../../../model/backend-typings';

@Component({
  selector: 'map',
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
