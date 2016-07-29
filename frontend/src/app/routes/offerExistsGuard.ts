import 'rxjs/add/operator/take';
import 'rxjs/add/operator/first';
import 'rxjs/add/observable/concat';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Store} from '@ngrx/store';
import {Guard, TraversalCandidate} from '@ngrx/router';
import {AppState, getOffersLoaded, hasOffer} from '../reducers';
import {OfferService} from "../shared/offer.service";
import {OfferActions} from "../actions/offer.actions";

@Injectable()
export class OfferExistsGuard implements Guard {
  constructor(private store: Store<AppState>,
              private offerService: OfferService,
              private offerActions: OfferActions) {
  }

  waitForOffersToLoad() {
    return this.store.let(getOffersLoaded())
      .filter(loaded => loaded)
      .take(1);
  }

  hasOfferInStore(id: number){
    return this.store.let(hasOffer(id)).take(1);
  }

  hasOfferInApi(id: number) {
    return this.offerService.getOffer(id)
      .map(offer => this.offerActions.loadOffer(offer))
      .do(action => this.store.dispatch(action))
      .map(offer => !!offer)
      .catch(() => Observable.of(false));
  }

  hasOffer(id: number) {
    return this.hasOfferInStore(id)
      .switchMap(inStore => {
        if (inStore) {
          return Observable.of(inStore);
        }
        return this.hasOfferInApi(id);
      });
  }

  protectRoute(candidate: TraversalCandidate) {
    if(candidate.routeParams.offerId === 'new') {
      return Observable.of(false);
    }
    return this.waitForOffersToLoad()
      .switchMapTo(this.hasOffer(candidate.routeParams.offerId));
  }

}
