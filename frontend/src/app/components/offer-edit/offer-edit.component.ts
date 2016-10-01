import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Offer} from '../../model/backend-typings';

@Component({
  selector: 'offer-edit',
  template: require('./offer-edit.component.html')
})
export class OfferEditComponent {

  @Input()
  offer: Offer;
  @Output()
  saveOffer = new EventEmitter<Offer>();
}
