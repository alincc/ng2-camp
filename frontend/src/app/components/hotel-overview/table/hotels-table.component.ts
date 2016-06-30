import {Component, Input} from '@angular/core';
import {Hotel} from '../../../model/backend-typings';
import {HotelWithCoordinate} from '../../../model/hotelWithCoordinate';

@Component({
  selector: 'hotels-table',
  template: require('./hotels-table.component.html')
})
export class HotelsTableComponent {

  @Input()
  hotels: HotelWithCoordinate[];

}

