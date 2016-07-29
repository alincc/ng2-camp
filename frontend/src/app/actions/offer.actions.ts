import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import {Offer} from '../model/backend-typings';

@Injectable()
export class OfferActions {

  static LOAD_OFFERS = '[Offer] Load Offers';
  loadOffers(): Action {
    return {
      type: OfferActions.LOAD_OFFERS
    };
  }

  static LOAD_OFFERS_SUCCESS = '[Offer] Load Offers Success';
  loadOffersSuccess(offers: Offer[]): Action {
    return {
      type: OfferActions.LOAD_OFFERS_SUCCESS,
      payload: offers
    };
  }

  static SAVE_OFFER = '[Offer] Save Offer';
  saveOffer(offer: Offer): Action {
    return {
      type: OfferActions.SAVE_OFFER,
      payload: offer
    };
  }

  static SAVE_OFFER_SUCCESS = '[Offer] Save Offer Success';
  saveOfferSuccess(offer: Offer): Action {
    return {
      type: OfferActions.SAVE_OFFER_SUCCESS,
      payload: offer
    };
  }

  static SAVE_OFFER_FAIL = '[Offer] Save Offer Fail';
  saveOfferFail(offer: Offer): Action {
    return {
      type: OfferActions.SAVE_OFFER_FAIL,
      payload: offer
    };
  }

  static DELETE_OFFER = '[Offer] Delete Offer';
  deleteOffer(offer: Offer): Action {
    return {
      type: OfferActions.DELETE_OFFER,
      payload: offer
    };
  }

  static DELETE_OFFER_SUCCESS = '[Offer] Delete Offer Success';
  deleteOfferSuccess(offer: Offer): Action {
    return {
      type: OfferActions.DELETE_OFFER_SUCCESS,
      payload: offer
    };
  }

  static DELETE_OFFER_FAIL = '[Offer] Delete Offer Fail';
  deleteOfferFail(offer: Offer): Action {
    return {
      type: OfferActions.DELETE_OFFER_FAIL,
      payload: offer
    };
  }

  static LOAD_OFFER = '[Offer] Load Offer';
  loadOffer(offer: Offer): Action {
    return {
      type: OfferActions.LOAD_OFFER,
      payload: offer
    };
  }

}
