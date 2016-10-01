import {Component, Input, Output, EventEmitter, ChangeDetectionStrategy} from '@angular/core';
import {Hotel} from '../../model/backend-typings';
import {Country} from '../../model/country';

@Component({
  selector: 'hotel-edit',
  template: require('./hotel-edit.component.html'),
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HotelEditComponent {

  @Input()
  hotel: Hotel = {};
  @Input()
  countries: Country[];
  @Output()
  saveHotel =  new EventEmitter<Hotel>();

}
