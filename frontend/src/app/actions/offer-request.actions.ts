import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import {OfferRequest} from '../model/backend-typings';

@Injectable()
export class OfferRequestActions {

  static LOAD_OFFER_REQUESTS = '[OfferRequest] Load OfferRequests';
  loadOfferRequests(): Action {
    return {
      type: OfferRequestActions.LOAD_OFFER_REQUESTS
    };
  }

  static LOAD_OFFER_REQUESTS_SUCCESS = '[OfferRequest] Load OfferRequests Success';
  loadOfferRequestsSuccess(offerRequests: OfferRequest[]): Action {
    return {
      type: OfferRequestActions.LOAD_OFFER_REQUESTS_SUCCESS,
      payload: offerRequests
    };
  }

  static SAVE_OFFER_REQUEST = '[OfferRequest] Save OfferRequest';
  saveOfferRequest(offerRequest: OfferRequest): Action {
    return {
      type: OfferRequestActions.SAVE_OFFER_REQUEST,
      payload: offerRequest
    };
  }

  static SAVE_OFFER_REQUEST_SUCCESS = '[OfferRequest] Save OfferRequest Success';
  saveOfferRequestSuccess(offerRequest: OfferRequest): Action {
    return {
      type: OfferRequestActions.SAVE_OFFER_REQUEST_SUCCESS,
      payload: offerRequest
    };
  }

  static SAVE_OFFER_REQUEST_FAIL = '[OfferRequest] Save OfferRequest Fail';
  saveOfferRequestFail(offerRequest: OfferRequest): Action {
    return {
      type: OfferRequestActions.SAVE_OFFER_REQUEST_FAIL,
      payload: offerRequest
    };
  }

  static DELETE_OFFER_REQUEST = '[OfferRequest] Delete OfferRequest';
  deleteOfferRequest(offerRequest: OfferRequest): Action {
    return {
      type: OfferRequestActions.DELETE_OFFER_REQUEST,
      payload: offerRequest
    };
  }

  static DELETE_OFFER_REQUEST_SUCCESS = '[OfferRequest] Delete OfferRequest Success';
  deleteOfferRequestSuccess(offerRequest: OfferRequest): Action {
    return {
      type: OfferRequestActions.DELETE_OFFER_REQUEST_SUCCESS,
      payload: offerRequest
    };
  }

  static DELETE_OFFER_REQUEST_FAIL = '[OfferRequest] Delete OfferRequest Fail';
  deleteOfferRequestFail(offerRequest: OfferRequest): Action {
    return {
      type: OfferRequestActions.DELETE_OFFER_REQUEST_FAIL,
      payload: offerRequest
    };
  }

  static LOAD_OFFER_REQUEST = '[OfferRequest] Load OfferRequest';
  loadOfferRequest(offerRequest: OfferRequest): Action {
    return {
      type: OfferRequestActions.LOAD_OFFER_REQUEST,
      payload: offerRequest
    };
  }

}
