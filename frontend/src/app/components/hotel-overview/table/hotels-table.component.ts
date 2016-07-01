import {Component, Input} from '@angular/core';
import {Hotel} from '../../../model/backend-typings';

@Component({
  selector: 'hotels-table',
  template: require('./hotels-table.component.html')
})
export class HotelsTableComponent {

  @Input()
  hotels: Hotel[];

}

