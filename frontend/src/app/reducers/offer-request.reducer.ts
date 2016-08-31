import {OfferRequest} from '..//model/backend-typings';
import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {Action} from '@ngrx/store';
import {OfferRequestActions} from "../actions/offer-request.actions";

export interface OfferRequestsState {
  loaded:boolean;
  loading:boolean;
  offerRequests:OfferRequest[];
}
;

const initialState:OfferRequestsState = {
  loaded: false,
  loading: false,
  offerRequests: []
};

export default function (state = initialState, action:Action):OfferRequestsState {
  switch (action.type) {
    case OfferRequestActions.LOAD_OFFER_REQUESTS:
    {
      return Object.assign({}, state, {
        loading: true
      });
    }

    case OfferRequestActions.LOAD_OFFER_REQUESTS_SUCCESS:
    {
      return {
        loaded: true,
        loading: false,
        offerRequests: action.payload,
      };
    }

    case OfferRequestActions.SAVE_OFFER_REQUEST_SUCCESS:
    case OfferRequestActions.DELETE_OFFER_REQUEST_FAIL:
    {
      return Object.assign({}, state, {
        offerRequests: [
          ...state.offerRequests,
          action.payload
        ]
      })
    }

    case OfferRequestActions.DELETE_OFFER_REQUEST_SUCCESS:
    case OfferRequestActions.SAVE_OFFER_REQUEST_FAIL:
    {
      return Object.assign({}, state, {
        ids: state.offerRequests.filter(offerRequest => offerRequest.id !== offerRequest.id)
      });
    }

    default:
    {
      return state;
    }
  }
}

export function getOfferRequestsLoaded() {
  return (state$:Observable<OfferRequestsState>) => state$
    .select(s => s.loaded);
}

export function getOfferRequestsLoading() {
  return (state$:Observable<OfferRequestsState>) => state$
    .select(s => s.loading);
}
export function hasOfferRequest(id:number) {
  return (state$:Observable<OfferRequestsState>) => state$
    .select(s => s.offerRequests
      .some(offerRequest => offerRequest.id.toString() === id.toString()));
}

export function getOfferRequests() {
  return (state$:Observable<OfferRequestsState>) => state$
    .select(s => s.offerRequests);
}

export function getOfferRequest(id:number) {
  return (state$:Observable<OfferRequestsState>) => state$
    .select(s => s.offerRequests)
    .flatMap(offerRequests => Observable.from(offerRequests))
    .filter(offerRequest => offerRequest.id.toString() === id.toString());
}
