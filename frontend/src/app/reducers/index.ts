import '@ngrx/core/add/operator/select';
import { compose } from '@ngrx/core/compose';
import { combineReducers } from '@ngrx/store';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/let';
import {Observable} from 'rxjs/Observable';
import hotelReducer, * as fromHotels from './hotel.reducer';
import campReducer, * as fromCamps from './camp.reducer';
import offerReducer, * as fromOffers from './offer.reducer';
import offerRequestReducer, * as fromOfferRequests from './offer-request.reducer';
import ratingReducer, * as fromRatings from './rating.reducer';

export interface AppState {
  hotels: fromHotels.HotelsState,
  camps: fromCamps.CampsState,
  offers: fromOffers.OffersState,
  offerRequests: fromOfferRequests.OfferRequestsState,
  ratings: fromRatings.RatingsState
}

export default combineReducers({
  hotels: hotelReducer,
  camps: campReducer,
  offers: offerReducer,
  offerRequests: offerRequestReducer,
  ratings: ratingReducer
});

export function getHotelsState() {
  return (state$: Observable<AppState>) => state$
    .select(s => s.hotels);
}

export function getHotelsLoaded() {
  return compose(fromHotels.getHotelsLoaded(), getHotelsState());
}

export function hasHotel(id: number) {
  return compose(fromHotels.hasHotel(id), getHotelsState());
}

export function getHotels() {
  return compose(fromHotels.getHotels(), getHotelsState());
}

export function getHotel(id: number) {
  return compose(fromHotels.getHotel(id), getHotelsState());
}

export function getCampsState() {
  return (state$: Observable<AppState>) => state$
    .select(s => s.camps);
}

export function getCampsLoaded() {
  return compose(fromCamps.getCampsLoaded(), getCampsState());
}

export function hasCamp(id: number) {
  return compose(fromCamps.hasCamp(id), getCampsState());
}

export function getCamps() {
  return compose(fromCamps.getCamps(), getCampsState());
}

export function getCamp(id: number) {
  return compose(fromCamps.getCamp(id), getCampsState());
}

export function getOffersState() {
  return (state$: Observable<AppState>) => state$
    .select(s => s.offers);
}

export function getOffersLoaded() {
  return compose(fromOffers.getOffersLoaded(), getOffersState());
}

export function hasOffer(id: number) {
  return compose(fromOffers.hasOffer(id), getOffersState());
}

export function getOffers() {
  return compose(fromOffers.getOffers(), getOffersState());
}

export function getOffer(id: number) {
  return compose(fromOffers.getOffer(id), getOffersState());
}

export function getOffersByHotelId(id: number) {
  return compose(fromOffers.getByHotelId(id), getOffersState());
}

export function getOfferRequestsState() {
  return (state$: Observable<AppState>) => state$
    .select(s => s.offerRequests);
}

export function getOfferRequestsLoaded() {
  return compose(fromOfferRequests.getOfferRequestsLoaded(), getOfferRequestsState());
}

export function hasOfferRequest(id: number) {
  return compose(fromOfferRequests.hasOfferRequest(id), getOfferRequestsState());
}

export function getOfferRequests() {
  return compose(fromOfferRequests.getOfferRequests(), getOfferRequestsState());
}

export function getOfferRequest(id: number) {
  return compose(fromOfferRequests.getOfferRequest(id), getOfferRequestsState());
}

export function getRatingsState() {
  return (state$: Observable<AppState>) => state$
    .select(s => s.ratings);
}

export function getRatingsLoaded() {
  return compose(fromRatings.getRatingsLoaded(), getRatingsState());
}

export function hasRating(id: number) {
  return compose(fromRatings.hasRating(id), getRatingsState());
}

export function getRatings() {
  return compose(fromRatings.getRatings(), getRatingsState());
}

export function getRatingsByHotelId(id: number) {
  return compose(fromRatings.getByHotelId(id), getRatingsState());
}

export function getRating(id: number) {
  return compose(fromRatings.getRating(id), getRatingsState());
}


