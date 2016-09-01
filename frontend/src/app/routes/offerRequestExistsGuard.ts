import 'rxjs/add/operator/take';
import 'rxjs/add/operator/first';
import 'rxjs/add/observable/concat';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Store} from '@ngrx/store';
import {AppState, getOfferRequestsLoaded, hasOfferRequest} from '../reducers';
import {OfferRequestService} from "../shared/offer-request.service";
import {OfferRequestActions} from "../actions/offer-request.actions";
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";

@Injectable()
export class OfferRequestExistsGuard implements CanActivate {
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

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    if(route.params['offerRequestId'] === 'new') {
      return Observable.of(false);
    }
    return this.waitForOfferRequestsToLoad()
      .switchMapTo(this.hasOfferRequest(route.params['offerRequestId']));
  }

}
