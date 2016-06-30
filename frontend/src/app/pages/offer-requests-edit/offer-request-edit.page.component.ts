import {Component, OnInit, OnDestroy} from '@angular/core';
import {RouteParams, Router} from '@ngrx/router';
import {HotelService} from '../../shared/hotel.service';
import {Hotel, OfferRequest} from '../../model/backend-typings';
import {RequestStatusEnum, getRequestStatusValues} from '../../model/RequestStatusEnum';
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
        [requestStatusList]="requestStatusList"
        (saveOfferRequest)="saveOfferRequest($event)">
    </offer-request-edit>
`
})
export class OfferRequestEditPageComponent implements OnInit, OnDestroy {

  hotels:Observable<Hotel[]>;
  offerRequest:Observable<OfferRequest>;
  requestStatusList:RequestStatusEnum[];

  private campId:number;
  private campIdSubscription:Subscription;
  private offerRequestSubscription:Subscription;

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
    this.offerRequestSubscription = this.routeParams.pluck<number>('offerRequestId')
      .subscribe(offerRequestId => {
        if (!isNaN(offerRequestId)) {
          this.offerRequest = this.offerRequestService.getOfferRequest(offerRequestId);
        } else {
          this.offerRequest = Observable.of({lastStatusChange: Date.now()} as OfferRequest);
        }
      });

    this.hotels = this.hotelService.getHotels();

    this.requestStatusList = getRequestStatusValues();
  }

  ngOnDestroy() {
    this.campIdSubscription.unsubscribe();
    this.offerRequestSubscription.unsubscribe();
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
