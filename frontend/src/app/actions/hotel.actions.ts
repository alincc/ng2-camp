import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import {Hotel} from '../model/backend-typings';

@Injectable()
export class HotelActions {

  static LOAD_HOTELS = '[Hotel] Load Hotels';
  loadHotels(): Action {
    return {
      type: HotelActions.LOAD_HOTELS
    };
  }

  static LOAD_HOTELS_SUCCESS = '[Hotel] Load Hotels Success';
  loadHotelsSuccess(hotels: Hotel[]): Action {
    return {
      type: HotelActions.LOAD_HOTELS_SUCCESS,
      payload: hotels
    };
  }

  static SAVE_HOTEL = '[Hotel] Save Hotel';
  saveHotel(hotel: Hotel): Action {
    return {
      type: HotelActions.SAVE_HOTEL,
      payload: hotel
    };
  }

  static SAVE_HOTEL_SUCCESS = '[Hotel] Save Hotel Success';
  saveHotelSuccess(hotel: Hotel): Action {
    return {
      type: HotelActions.SAVE_HOTEL_SUCCESS,
      payload: hotel
    };
  }

  static SAVE_HOTEL_FAIL = '[Hotel] Save Hotel Fail';
  saveHotelFail(hotel: Hotel): Action {
    return {
      type: HotelActions.SAVE_HOTEL_FAIL,
      payload: hotel
    };
  }

  static DELETE_HOTEL = '[Hotel] Delete Hotel';
  deleteHotel(hotel: Hotel): Action {
    return {
      type: HotelActions.DELETE_HOTEL,
      payload: hotel
    };
  }

  static DELETE_HOTEL_SUCCESS = '[Hotel] Delete Hotel Success';
  deleteHotelSuccess(hotel: Hotel): Action {
    return {
      type: HotelActions.DELETE_HOTEL_SUCCESS,
      payload: hotel
    };
  }

  static DELETE_HOTEL_FAIL = '[Hotel] Delete Hotel Fail';
  deleteHotelFail(hotel: Hotel): Action {
    return {
      type: HotelActions.DELETE_HOTEL_FAIL,
      payload: hotel
    };
  }

  static LOAD_HOTEL = '[Hotel] Load Hotel';
  loadHotel(hotel: Hotel): Action {
    return {
      type: HotelActions.LOAD_HOTEL,
      payload: hotel
    };
  }

}
