import {Component, Input} from '@angular/core';
import {Camp, OfferRequest} from '../../../model/backend-typings';

@Component({
  selector: 'camp-book',
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
