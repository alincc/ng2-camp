import {Component, Input, OnInit} from '@angular/core';
import {Camp, Offer, OfferRequest} from '../../../model/backend-typings';
import {MaterializeDirective} from 'angular2-materialize/dist/index';
import {RequestStatusEnum} from '../../../model/RequestStatusEnum';

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
        offerRequest.offer = new Offer();
        offerRequest.offer.accepted = true;
        offerRequest.offer.hotel = offerRequest.hotel;
      }
    }
  }
}
