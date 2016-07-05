import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMapTo';
import {StateUpdates, Effect, toPayload} from '@ngrx/effects';
import {Router} from '@ngrx/router';
import {AppState} from '../reducers';
import {OfferRequest} from '../model/backend-typings';
import {OfferRequestService} from "../shared/offer-request.service";
import {OfferRequestActions} from "../actions/offer-request.actions";

@Injectable()
export class OfferRequestEffects {
  constructor(private updates$:StateUpdates<AppState>,
              private offerRequestService:OfferRequestService,
              private router:Router,
              private offerRequestActions:OfferRequestActions) {
  }

  @Effect()
  loadOfferRequestsOnInit = Observable.of(this.offerRequestActions.loadOfferRequests());

  @Effect()
  loadOfferRequests = this.updates$
    .whenAction(OfferRequestActions.LOAD_OFFER_REQUESTS)
    .switchMapTo(this.offerRequestService.getOfferRequests())
    .map(offerRequests => this.offerRequestActions.loadOfferRequestsSuccess(offerRequests));

  /*@Effect()
  saveOfferRequest = this.updates$
    .whenAction(OfferRequestActions.SAVE_OFFER_REQUEST)
    .map<OfferRequest>(toPayload)
    .flatMap(offerRequest => this.offerRequestService.saveOfferRequest(offerRequest)
      .map(savedOfferRequest => this.offerRequestActions.saveOfferRequestSuccess(savedOfferRequest))
      .catch(() => Observable.of(
        this.offerRequestActions.saveOfferRequestFail(offerRequest)
      ))
    );

  @Effect()
  saveOfferRequestSuccess = this.updates$
    .whenAction(OfferRequestActions.SAVE_OFFER_REQUEST_SUCCESS)
    .map<OfferRequest>(toPayload)
    .do(offerRequest => {
      this.router.go('/offerRequests/' + offerRequest.id)
    }).filter(() => false);

  @Effect()
  deleteOfferRequest = this.updates$
    .whenAction(OfferRequestActions.DELETE_OFFER_REQUEST)
    .map<OfferRequest>(toPayload)
    .flatMap(offerRequest => this.offerRequestService.deleteOfferRequest(offerRequest.id)
      .mapTo(this.offerRequestActions.deleteOfferRequestSuccess(offerRequest))
      .catch(() => Observable.of(
        this.offerRequestActions.deleteOfferRequestFail(offerRequest)
      ))
    );*/

}
