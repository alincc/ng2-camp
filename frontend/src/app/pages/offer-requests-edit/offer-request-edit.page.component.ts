import {Component, OnInit, OnDestroy} from '@angular/core';
import {RouteParams, Router} from '@ngrx/router';
import {HotelService} from '../../shared/hotel.service';
import {Hotel, OfferRequest} from '../../model/backend-typings';
import {OfferRequestService} from '../../shared/offer-request.service';
import {OfferRequestEditComponent} from '../../components/offer-request-edit/offer-request-edit.component';
import {Observable} from 'rxjs/Observable';
import {Subscription} from "rxjs/Subscription";
import 'rxjs/add/operator/pluck';

@Component({
  selector: 'offer-request-edit-page',
  directives: [OfferRequestEditComponent],
  template: `
    <offer-request-edit
        [offerRequest]="offerRequest | async"
        [hotels]="hotels | async"
        (saveOfferRequest)="saveOfferRequest($event)">
    </offer-request-edit>
`
})
export class OfferRequestEditPageComponent implements OnInit, OnDestroy {

  hotels:Observable<Hotel[]>;
  offerRequest:Observable<OfferRequest>;

  private campId:number;
  private campIdSubscription:Subscription;

  constructor(private routeParams:RouteParams,
              private hotelService:HotelService,
              private offerRequestService:OfferRequestService,
              private router:Router) {
  }

  ngOnInit() {
    this.campIdSubscription = this.routeParams.pluck<number>('campId')
      .filter(campId => !isNaN(campId))
      .subscribe(
        (id) => this.campId = id
    );
    this.offerRequest = this.routeParams.pluck<number>('offerRequestId')
      .filter(offerRequestId => !isNaN(offerRequestId))
      .flatMap(offerRequestId => this.offerRequestService.getOfferRequest(offerRequestId));
    this.hotels = this.hotelService.getHotels();
  }

  ngOnDestroy() {
    this.campIdSubscription.unsubscribe();
  }

  saveOfferRequest(offerRequest:OfferRequest) {
    this.offerRequestService.saveOfferRequest(this.campId, offerRequest).subscribe(
      () => this.goToCamp()
    );
  }

  private goToCamp() {
    this.router.go('/camps/' + this.campId);
  }
}
