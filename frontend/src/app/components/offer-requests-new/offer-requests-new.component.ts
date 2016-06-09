import {Component, OnInit} from '@angular/core';
import {RouteParams} from '@ngrx/router';
import {MaterializeDirective} from 'angular2-materialize';
import {HotelService} from '../../shared/hotel.service';
import {Hotel, OfferRequest} from '../../model/backend-typings';
import {OfferRequestService} from '../../shared/offer-request.service';

@Component({
  selector: 'offer-request-edit',
  directives: [MaterializeDirective],
  template: require('./offer-requests-new.component.html')
})
export class OfferRequestNewComponent implements OnInit {
  hotels: Hotel[] = [];
  offerRequest: OfferRequest = {};

  constructor(private routeParams: RouteParams,
              private hotelService: HotelService,
              private offerRequestService: OfferRequestService) {
  }

  ngOnInit() {
    this.routeParams.pluck('offerRequestId')
      .filter(id => !isNaN(id))
      .flatMap((id: number) => {
        this.offerRequestService.getOfferRequest(id).subscribe(
          (offerRequest: OfferRequest) => this.offerRequest = offerRequest
        )
      });
    this.hotelService.getHotels().subscribe(
      (hotels: Hotel[]) => this.hotels = hotels
    )
  }
}
