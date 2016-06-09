import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/zip';
import {RouteParams, QueryParams, Router} from '@ngrx/router';
import {OfferService} from '../../shared/offer.service';
import {Offer, Hotel} from '../../model/backend-typings';
import {HotelService} from '../../shared/hotel.service';
import {MaterializeDirective} from 'angular2-materialize/dist/index';
import {Subscription} from 'rxjs/Rx';

@Component({
  selector: 'offer-edit',
  directives: [MaterializeDirective],
  providers: [OfferService, HotelService],
  template: require('./offer-edit.component.html')
})
export class OfferEditComponent implements OnInit {

  offer: Offer;

  private subscription: Subscription;

  constructor(private router: Router,
              private routeParams: RouteParams,
              private queryParams: QueryParams,
              private offerService: OfferService,
              private hotelService: HotelService) {
  }

  ngOnInit() {
    let offerObservable = this.routeParams.pluck<number>('offerId').switchMap(id => this.getOffer(id));
    let hotelObservable = this.queryParams.pluck<number>('hotelId').switchMap(id => this.getHotel(id));

    this.subscription = Observable.zip(offerObservable, hotelObservable)
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

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  saveOffer() {
    this.offer.totalPrice = +this.offer.totalPrice;
    this.offer.numberOfPeople = +this.offer.numberOfPeople;
    this.offer.singleRooms = +this.offer.singleRooms;
    this.offer.doubleRooms = +this.offer.doubleRooms;
    this.offer.fromDate = new Date(this.offer.fromDate + '');
    this.offer.toDate = new Date(this.offer.toDate + '');
    this.offer.offerDate = new Date(this.offer.offerDate + '');
    this.offer.expirationDate = new Date(this.offer.expirationDate + '');

    this.offerService.saveOfferForHotelId(this.offer.hotel.id, this.offer).subscribe(response => {
      this.router.go('/hotels/' + this.offer.hotel.id);
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
}
