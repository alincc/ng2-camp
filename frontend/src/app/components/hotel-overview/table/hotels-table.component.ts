import {Component, Input, ChangeDetectionStrategy} from '@angular/core';
import {Hotel} from '../../../model/backend-typings';

@Component({
  selector: 'hotels-table',
  template: require('./hotels-table.component.html'),
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HotelsTableComponent {

  @Input()
  hotels: Hotel[];

}

