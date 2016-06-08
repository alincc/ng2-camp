import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/zip';
import {RouteParams, QueryParams} from '@ngrx/router';
import {OfferService} from '../../shared/offer.service';
import {Offer, Hotel} from '../../model/backend-typings';
import {HotelService} from '../../shared/hotel.service';
import {MaterializeDirective} from 'angular2-materialize/dist/index';

@Component({
  selector: 'offer-edit',
  directives: [MaterializeDirective],
  providers: [OfferService, HotelService],
  template: require('./offer-edit.component.html')
})
export class OfferEditComponent implements OnInit {

  offer: Offer;

  constructor(private routeParams: RouteParams,
              private queryParams: QueryParams,
              private offerService: OfferService,
              private hotelService: HotelService) {
  }

  ngOnInit() {
    let offerObservable = this.routeParams.pluck<number>('id').flatMap(id => this.getOffer(id));
    let hotelObservable = this.queryParams.pluck<number>('hotelId').flatMap(id => this.getHotel(id));

    Observable.zip(offerObservable, hotelObservable)
      .map(data => {
        let offer: Offer = data[0];
        let hotel: Hotel = data[1];
        if (hotel) {
          offer.hotel = hotel;
        }
        return offer;
      }).subscribe(offer => {
      this.offer = offer;
    });
  }

  private getOffer(offerId): Observable<Offer> {
    if (isNaN(offerId)) {
      return Observable.of({} as Offer);
    } else {
      return this.offerService.getOffer(offerId);
    }
  }

  private getHotel(hotelId): Observable<Hotel> {
    if (isNaN(hotelId)) {
      return Observable.of(undefined);
    } else {
      return this.hotelService.getHotel(hotelId);
    }
  }

  saveOffer() {
    this.offerService.saveOffer(this.offer).subscribe(offer => {
    });
  }
}
