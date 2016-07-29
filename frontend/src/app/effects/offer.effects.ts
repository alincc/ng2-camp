import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMapTo';
import {StateUpdates, Effect, toPayload} from '@ngrx/effects';
import {Router} from '@ngrx/router';
import {AppState} from '../reducers';
import {Offer} from '../model/backend-typings';
import {OfferService} from "../shared/offer.service";
import {OfferActions} from "../actions/offer.actions";

@Injectable()
export class OfferEffects {
  constructor(private updates$:StateUpdates<AppState>,
              private offerService:OfferService,
              private router:Router,
              private offerActions:OfferActions) {
  }

  @Effect()
  loadOffersOnInit = Observable.of(this.offerActions.loadOffers());

  @Effect()
  loadOffers = this.updates$
    .whenAction(OfferActions.LOAD_OFFERS)
    .switchMapTo(this.offerService.getOffers())
    .map(offers => this.offerActions.loadOffersSuccess(offers));

  /*@Effect()
  saveOffer = this.updates$
    .whenAction(OfferActions.SAVE_OFFER)
    .map<Offer>(toPayload)
    .flatMap(offer => this.offerService.saveOfferForHotelId(offer)
      .map(savedOffer => this.offerActions.saveOfferSuccess(savedOffer))
      .catch(() => Observable.of(
        this.offerActions.saveOfferFail(offer)
      ))
    );

  @Effect()
  saveOfferSuccess = this.updates$
    .whenAction(OfferActions.SAVE_OFFER_SUCCESS)
    .map<Offer>(toPayload)
    .do(offer => {
      this.router.go('/offers/' + offer.id)
    }).filter(() => false);

  @Effect()
  deleteOffer = this.updates$
    .whenAction(OfferActions.DELETE_OFFER)
    .map<Offer>(toPayload)
    .flatMap(offer => this.offerService.deleteOffer(offer.id)
      .mapTo(this.offerActions.deleteOfferSuccess(offer))
      .catch(() => Observable.of(
        this.offerActions.deleteOfferFail(offer)
      ))
    );
*/
}
