import {Component, OnInit, OnDestroy} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {Subscription} from "rxjs/Subscription";
import {RouteParams, Router, QueryParams} from '@ngrx/router';
import {OfferService} from '../../shared/offer.service';
import {Offer} from '../../model/backend-typings';
import {OfferEditComponent} from '../..//components/offer-edit/offer-edit.component';

@Component({
  selector: 'offer-edit-page',
  directives: [OfferEditComponent],
  template: `
    <offer-edit
        [offer]="offer | async"
        (saveOffer)="saveOffer($event)">
    </offer-edit>
`
})
export class OfferEditPageComponent implements OnInit, OnDestroy {

  offer:Observable<Offer>;
  hotelId:number;
  offerIdSubscription:Subscription;
  hotelIdSubscription:Subscription;

  constructor(private router:Router,
              private routeParams:RouteParams,
              private queryParams:QueryParams,
              private offerService:OfferService) {
  }

  ngOnInit() {
    this.offerIdSubscription = this.routeParams.pluck<string>('offerId')
      .map(offerId => parseInt(offerId))
      .subscribe(offerId => {
        if (!isNaN(offerId)) {
          this.offer = this.offerService.getOffer(offerId);
        } else {
          this.offer = Observable.of({} as Offer);
        }
      });
     this.hotelIdSubscription= this.queryParams.pluck<string>('hotelId')
       .map(id => parseInt(id))
      .subscribe(id => this.hotelId = id);
  }

  ngOnDestroy() {
    this.offerIdSubscription.unsubscribe();
    this.hotelIdSubscription.unsubscribe();
  }

  saveOffer(offer:Offer) {
    let offerToSave:Offer = offer;
    offerToSave.totalPrice = +offer.totalPrice;
    offerToSave.numberOfPeople = +offer.numberOfPeople;
    offerToSave.singleRooms = +offer.singleRooms;
    offerToSave.doubleRooms = +offer.doubleRooms;
    offerToSave.fromDate = new Date(offer.fromDate + '');
    offerToSave.toDate = new Date(offer.toDate + '');
    offerToSave.offerDate = new Date(offer.offerDate + '');
    offerToSave.expirationDate = new Date(offer.expirationDate + '');
    this.offerService.saveOfferForHotelId(this.hotelId, offerToSave).subscribe(() => {
      this.router.go('/hotels/' + this.hotelId);
    });
  }
}
