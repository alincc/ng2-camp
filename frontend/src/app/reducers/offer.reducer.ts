import {Offer} from '..//model/backend-typings';
import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {Action} from '@ngrx/store';
import {OfferActions} from "../actions/offer.actions";

export interface OffersState {
  loaded:boolean;
  loading:boolean;
  offers:Offer[];
}
;

const initialState:OffersState = {
  loaded: false,
  loading: false,
  offers: []
};

export default function (state = initialState, action:Action):OffersState {
  switch (action.type) {
    case OfferActions.LOAD_OFFERS:
    {
      return Object.assign({}, state, {
        loading: true
      });
    }

    case OfferActions.LOAD_OFFERS_SUCCESS:
    {
      return {
        loaded: true,
        loading: false,
        offers: action.payload,
      };
    }

    case OfferActions.SAVE_OFFER_SUCCESS:
    case OfferActions.DELETE_OFFER_FAIL:
    {
      return Object.assign({}, state, {
        offers: [
          ...state.offers,
          action.payload
        ]
      })
    }

    case OfferActions.DELETE_OFFER_SUCCESS:
    case OfferActions.SAVE_OFFER_FAIL:
    {
      return Object.assign({}, state, {
        ids: state.offers.filter(offer => offer.id !== offer.id)
      });
    }

    default:
    {
      return state;
    }
  }
}

export function getOffersLoaded() {
  return (state$:Observable<OffersState>) => state$
    .select(s => s.loaded);
}

export function getOffersLoading() {
  return (state$:Observable<OffersState>) => state$
    .select(s => s.loading);
}
export function hasOffer(id:number) {
  return (state$:Observable<OffersState>) => state$
    .select(s => s.offers
      .some(offer => offer.id.toString() === id.toString()));
}

export function getOffers() {
  return (state$:Observable<OffersState>) => state$
    .select(s => s.offers);
}

export function getByHotelId(id:number) {
  return (state$:Observable<OffersState>) => state$
    .select(s => s.offers
    .filter(offer => {
      return offer.hotel.id.toString() === id.toString()
    }));
}

export function getOffer(id:number) {
  return (state$:Observable<OffersState>) => state$
    .select(s => s.offers)
    .flatMap(offers => Observable.from(offers))
    .filter(offer => offer.id.toString() === id.toString());
}
