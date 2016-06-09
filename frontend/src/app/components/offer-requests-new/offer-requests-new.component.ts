import {Component, OnInit} from '@angular/core';
import {RouteParams, Router} from '@ngrx/router';
import {MaterializeDirective} from 'angular2-materialize';
import {HotelService} from '../../shared/hotel.service';
import {Hotel, OfferRequestCreateDto} from '../../model/backend-typings';
import {OfferRequestService} from '../../shared/offer-request.service';
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'offer-request-edit',
  directives: [MaterializeDirective],
  template: require('./offer-requests-new.component.html')
})
export class OfferRequestNewComponent implements OnInit {
  hotels:Hotel[] = [];
  offerRequest:OfferRequestCreateDto = {status: 'REQUEST_SENT'};

  private campId:number;
  private campIdSubscription:Subscription;
  private hotelSubscription:Subscription;

  constructor(private routeParams:RouteParams,
              private hotelService:HotelService,
              private offerRequestService:OfferRequestService,
              private router:Router) {
  }

  ngOnInit() {
    this.campIdSubscription = this.routeParams.pluck('campId').subscribe(
      (id:number) => this.campId = id
    );
    this.hotelSubscription = this.hotelService.getHotels().subscribe(
      (hotels:Hotel[]) => this.hotels = hotels
    );
  }

  saveOfferRequest() {
    this.offerRequestService.saveOfferRequest(this.campId, this.offerRequest).subscribe(
      () => this.goToCamp()
    );
  }

  private goToCamp() {
    this.router.go('/camps/' + this.campId);
  }

  ngOnDestroy() {
    this.campIdSubscription.unsubscribe();
    this.hotelSubscription.unsubscribe();
  }
}
