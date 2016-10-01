import {Component, Input, OnInit} from '@angular/core';
import {Camp, Hotel} from '../../../model/backend-typings';
import {MaterializeDirective} from 'angular2-materialize/dist/index';
import {RatingListComponent} from '../../hotel-detail/rating-list/rating-list.component';
import {RatingNewComponent} from '../../hotel-detail/rating-new/rating-new.component';

@Component({
  selector: 'camp-review',
  template: require('./camp-review.component.html')
})
export class CampReviewComponent implements OnInit {

  @Input()
  camp: Camp;

  acceptedHotel: Hotel;

  ngOnInit():any {
    if (this.camp.offerRequests) {
      let acceptedOffer = this.camp.offerRequests.find(offerRequest => offerRequest.offer && offerRequest.offer.accepted);
      this.acceptedHotel = acceptedOffer ? acceptedOffer.hotel : undefined;
    }
  }
}
