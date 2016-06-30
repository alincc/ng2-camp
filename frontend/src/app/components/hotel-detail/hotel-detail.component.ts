import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Hotel, Rating, Offer} from '../../model/backend-typings';
import {MaterializeDirective} from 'angular2-materialize/dist/index';
import {MapComponent} from './map/map.component';
import {OfferListComponent} from './offer-list/offer-list.component';
import {RatingListComponent} from './rating-list/rating-list.component';
import {RatingNewComponent} from "./rating-new/rating-new.component";
import {Coordinate} from '../../model/coordinate'; 

@Component({
  selector: 'hotel-detail',
  directives: [MaterializeDirective, MapComponent, OfferListComponent, RatingListComponent, RatingNewComponent],
  template: require('./hotel-detail.component.html')
})
export class HotelDetailComponent {

  @Input()
  hotel: Hotel;
  @Input()
  ratings: Rating[];
  @Input()
  offers: Offer[];
  @Input()
  coordinate: Coordinate;
  @Output()
  delete = new EventEmitter<Hotel>();

  getHotelImage() {
    return this.hotel.pictureUrl ? this.hotel.pictureUrl : '/assets/img/default_image.png';
  }

}
