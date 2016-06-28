import {Component, OnInit} from '@angular/core';
import {RouteParams, Router} from '@ngrx/router';
import {MaterializeDirective} from 'angular2-materialize';
import {HotelService} from '../../shared/hotel.service';
import {Hotel, OfferRequest} from '../../model/backend-typings';
import {RequestStatusEnum, getRequestStatusValues} from '../../model/RequestStatusEnum';
import {OfferRequestService} from '../../shared/offer-request.service';
import {Subscription} from "rxjs/Subscription";
import {Observable} from "rxjs/Rx";

@Component({
  selector: 'offer-request-edit',
  directives: [MaterializeDirective],
  template: require('./offer-requests-edit.component.html')
})
export class OfferRequestEditComponent implements OnInit {
  hotels:Hotel[] = [];
  offerRequest:OfferRequest = {status: 'REQUEST_SENT'};
  isNewTemplate:boolean = false;

  private campId:number;
  private offerRequestIdSubscription:Subscription;
  private campIdSubscription:Subscription;
  private hotelSubscription:Subscription;
  private observable:Observable<number>;
  private requestStatusList:RequestStatusEnum[] = getRequestStatusValues();

  constructor(private routeParams:RouteParams,
              private hotelService:HotelService,
              private offerRequestService:OfferRequestService,
              private router:Router) {
  }

  ngOnInit() {
    this.observable = this.routeParams.pluck<number>('offerRequestId')
      .filter(id => !isNaN(id));
    this.offerRequestIdSubscription = this.observable
      .flatMap(id => this.offerRequestService.getOfferRequest(id))
      .subscribe(offerRequest => {
        this.offerRequest = offerRequest;
      });
    this.isNewTemplate = false;

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
    this.offerRequestIdSubscription.unsubscribe();
    this.campIdSubscription.unsubscribe();
    this.hotelSubscription.unsubscribe();
  }
}
