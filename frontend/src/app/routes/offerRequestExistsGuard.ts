import 'rxjs/add/operator/take';
import 'rxjs/add/operator/first';
import 'rxjs/add/observable/concat';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Store} from '@ngrx/store';
import {Guard, TraversalCandidate} from '@ngrx/router';
import {AppState, getOfferRequestsLoaded, hasOfferRequest} from '../reducers';
import {OfferRequestService} from "../shared/offer-request.service";
import {OfferRequestActions} from "../actions/offer-request.actions";

@Injectable()
export class OfferRequestExistsGuard implements Guard {
  constructor(private store: Store<AppState>,
              private offerRequestService: OfferRequestService,
              private offerRequestActions: OfferRequestActions) {
  }

  waitForOfferRequestsToLoad() {
    return this.store.let(getOfferRequestsLoaded())
      .filter(loaded => loaded)
      .take(1);
  }

  hasOfferRequestInStore(id: number){
    return this.store.let(hasOfferRequest(id)).take(1);
  }

  hasOfferRequestInApi(id: number) {
    return this.offerRequestService.getOfferRequest(id)
      .map(offerRequest => this.offerRequestActions.loadOfferRequest(offerRequest))
      .do(action => this.store.dispatch(action))
      .map(offerRequest => !!offerRequest)
      .catch(() => Observable.of(false));
  }

  hasOfferRequest(id: number) {
    return this.hasOfferRequestInStore(id)
      .switchMap(inStore => {
        if (inStore) {
          return Observable.of(inStore);
        }
        return this.hasOfferRequestInApi(id);
      });
  }

  protectRoute(candidate: TraversalCandidate) {
    if(candidate.routeParams.offerRequestId === 'new') {
      return Observable.of(false);
    }
    return this.waitForOfferRequestsToLoad()
      .switchMapTo(this.hasOfferRequest(candidate.routeParams.offerRequestId));
  }

}
