import {Component, Input, Output, EventEmitter, ChangeDetectionStrategy} from '@angular/core';
import {Hotel} from '../../model/backend-typings';
import {Country} from '../../model/country';
import {MaterializeDirective} from 'angular2-materialize';

@Component({
  selector: 'hotel-edit',
  directives: [MaterializeDirective],
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
