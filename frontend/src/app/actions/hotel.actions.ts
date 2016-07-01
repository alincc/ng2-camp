import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import {Hotel} from '../model/backend-typings';

@Injectable()
export class HotelActions {

  static LOAD_COLLECTION = '[Hotel] Load Collection';
  loadCollection(): Action {
    return {
      type: HotelActions.LOAD_COLLECTION
    };
  }

  static LOAD_COLLECTION_SUCCESS = '[Hotel] Load Collection Success';
  loadCollectionSuccess(hotels: Hotel[]): Action {
    return {
      type: HotelActions.LOAD_COLLECTION_SUCCESS,
      payload: hotels
    };
  }

  static ADD_TO_COLLECTION = '[Hotel] Add to Collection';
  addToCollection(hotel: Hotel): Action {
    return {
      type: HotelActions.ADD_TO_COLLECTION,
      payload: hotel
    };
  }

  static ADD_TO_COLLECTION_SUCCESS = '[Hotel] Add to Collection Success';
  addToCollectionSuccess(hotel: Hotel): Action {
    return {
      type: HotelActions.ADD_TO_COLLECTION_SUCCESS,
      payload: hotel
    };
  }

  static ADD_TO_COLLECTION_FAIL = '[Hotel] Add to Collection Fail';
  addToCollectionFail(hotel: Hotel): Action {
    return {
      type: HotelActions.ADD_TO_COLLECTION_FAIL,
      payload: hotel
    };
  }

  static ADD_HOTEL = '[Hotel] Add Hotel';
  addHotel(hotel: Hotel): Action {
    return {
      type: HotelActions.ADD_HOTEL,
      payload: hotel
    };
  }



}
