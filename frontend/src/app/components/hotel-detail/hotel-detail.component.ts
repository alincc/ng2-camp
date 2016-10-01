import {Component, Input, Output, EventEmitter, ChangeDetectionStrategy} from '@angular/core';
import {Hotel, Rating, Offer} from '../../model/backend-typings';

@Component({
  selector: 'hotel-detail',
  template: require('./hotel-detail.component.html'),
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HotelDetailComponent {

  @Input()
  hotel: Hotel;
  @Input()
  ratings: Rating[];
  @Input()
  offers: Offer[];
  @Output()
  delete = new EventEmitter<Hotel>();

  getHotelImage() {
    return this.hotel.pictureUrl ? this.hotel.pictureUrl : '/assets/img/default_image.png';
  }

}
