import {Component, Input} from '@angular/core';
import {Camp, OfferRequest} from '../../../model/backend-typings';
import {MaterializeDirective} from 'angular2-materialize/dist/index';

@Component({
  selector: 'camp-book',
  directives: [MaterializeDirective],
  template: require('./camp-book.component.html')
})
export class CampBookComponent {

  @Input()
  camp: Camp;

  acceptOffer(offerRequest: OfferRequest) {
    // TODO offerRequest is null
    if (offerRequest) {
      offerRequest.status = "OFFER_CONFIRMED";
      offerRequest.lastStatusChange = new Date();
      if (!offerRequest.offer) {
        offerRequest.offer = {
          accepted: true,
          hotel: offerRequest.hotel
        };
      }
    }
  }
}
