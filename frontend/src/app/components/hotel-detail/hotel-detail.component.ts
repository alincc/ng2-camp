import {Component, OnInit} from '@angular/core';
import {RouteParams, Router} from '@ngrx/router';
import 'rxjs/add/operator/pluck';
import {HotelService} from '../../shared/hotel.service';
import {Hotel} from '../../model/backend-typings';
import * as Materialize from 'angular2-materialize/dist/index';
import {MaterializeDirective} from 'angular2-materialize/dist/index';
import {MapComponent} from './map/map.component';
import {Observable} from 'rxjs/Observable';
import {OfferListComponent} from './offer-list/offer-list.component';
import {RatingListComponent} from "./rating-list/rating-list.component";

@Component({
  selector: 'hotel-detail',
  directives: [MaterializeDirective, MapComponent, OfferListComponent, RatingListComponent],
  providers: [],
  template: require('./hotel-detail.component.html')
})
export class HotelDetailComponent implements OnInit {
  hotel: Hotel = {};
  hotelObservable: Observable<Hotel>;
  hotelId: Observable<number>;

  constructor(private routeParams: RouteParams,
              private hotelService: HotelService,
              private router: Router) {
  }

  ngOnInit(): any {
    this.hotelId = this.routeParams.pluck<number>('id');
    this.hotelObservable = this.hotelId
      .filter(id => !isNaN(id))
      .flatMap(id => this.hotelService.getHotel(id));
    this.hotelObservable.subscribe(hotel => {
      this.hotel = hotel;
    });
  }

  deleteHotel() {
    if (this.hotel && this.hotel.id) {
      this.hotelService.deleteHotel(this.hotel.id).subscribe(() => {
        Materialize.toast('Deleted hotel', 4000, 'rounded');
        this.router.go('/hotels');
      }, () => {
        Materialize.toast('Error: Could not delete hotel', 4000, 'rounded');
      });
    }
  }

  getHotelImage() {
    return this.hotel.pictureUrl ? this.hotel.pictureUrl : '/assets/img/default_image.png';
  }
}
