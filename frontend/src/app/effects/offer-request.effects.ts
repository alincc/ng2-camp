import {Injectable, OnDestroy} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMapTo';
import {Actions, Effect} from '@ngrx/effects';
import {OfferRequestService} from "../shared/offer-request.service";
import {OfferRequestActions} from "../actions/offer-request.actions";
import {Router} from "@ngrx/router";

@Injectable()
export class OfferRequestEffects implements OnDestroy {
  constructor(private actions$:Actions,
              private router: Router,
              private offerRequestService:OfferRequestService,
              private offerRequestActions:OfferRequestActions) {
  }

  ngOnDestroy() {
  }

  @Effect()
  loadOfferRequestsOnInit = Observable.of(this.offerRequestActions.loadOfferRequests());

  @Effect()
  loadOfferRequests = this.actions$
    .ofType(OfferRequestActions.LOAD_OFFER_REQUESTS)
    .switchMapTo(this.offerRequestService.getOfferRequests())
    .map(offerRequests => this.offerRequestActions.loadOfferRequestsSuccess(offerRequests));

  /*@Effect()
  saveOfferRequest = this.actions$
    .ofType(OfferRequestActions.SAVE_OFFER_REQUEST)
    .flatMap(offerRequest => this.offerRequestService.saveOfferRequest(offerRequest)
      .map(savedOfferRequest => this.offerRequestActions.saveOfferRequestSuccess(savedOfferRequest))
      .catch(() => Observable.of(
        this.offerRequestActions.saveOfferRequestFail(offerRequest)
      ))
    );*/

  @Effect()
  saveOfferRequestSuccess = this.actions$
    .ofType(OfferRequestActions.SAVE_OFFER_REQUEST_SUCCESS)
    .do(offerRequest => {
      this.router.go('/offerRequests/' + offerRequest.id)
    }).filter(() => false);

  @Effect()
  deleteOfferRequest = this.actions$
    .ofType(OfferRequestActions.DELETE_OFFER_REQUEST)
    .flatMap(offerRequest => this.offerRequestService.deleteOfferRequest(offerRequest.id)
      .mapTo(this.offerRequestActions.deleteOfferRequestSuccess(offerRequest))
      .catch(() => Observable.of(
        this.offerRequestActions.deleteOfferRequestFail(offerRequest)
      ))
    );

}
