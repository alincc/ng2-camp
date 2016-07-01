import {Component} from '@angular/core';
import {RouteParams, Router} from '@ngrx/router';
import 'rxjs/add/operator/pluck';
import {HotelService} from '../../shared/hotel.service';
import {Hotel, Rating, Offer} from '../../model/backend-typings';
import {Observable} from 'rxjs/Observable';
import {HotelDetailComponent} from '../../components/hotel-detail/hotel-detail.component';
import {RatingService} from '../../shared/rating.service';
import {MapService} from '../../shared/map.service';
import * as Materialize from 'angular2-materialize/dist/index';
import {OfferService} from '../../shared/offer.service';

@Component({
  selector: 'hotel-detail-page',
  directives: [HotelDetailComponent],
  providers: [],
  template: `
    <hotel-detail 
        [hotel]="hotel | async" 
        [ratings]="ratings | async"
        [offers]="offers | async"
        (delete)="deleteHotel($event)">
    </hotel-detail>
    `
})
export class HotelDetailPageComponent {

  hotel:Observable<Hotel>;
  ratings:Observable<Rating[]>;
  offers:Observable<Offer[]>;

  constructor(private routeParams:RouteParams,
              private router: Router,
              private ratingService:RatingService,
              private offerService:OfferService,
              private mapService:MapService,
              private hotelService:HotelService) {
  }

  ngOnInit() {
    let hotelId = this.routeParams.pluck<number>('hotelId');
    this.hotel = hotelId
      .filter(hotelId => !isNaN(hotelId))
      .flatMap(hotelId => this.hotelService.getHotel(hotelId));
    this.ratings = hotelId
      .filter(hotelId => !isNaN(hotelId))
      .flatMap(hotelId => this.ratingService.getByHotelId(hotelId));
    this.hotel = this.hotel.
      flatMap(hotel => this.mapService.enrichHotelWithCoordinate(hotel));
    this.offers = this.hotel.flatMap(hotel => this.offerService.getByHotelId(hotel.id));
  }

  deleteHotel(hotel: Hotel) {
    if (hotel && hotel.id) {
      this.hotelService.deleteHotel(hotel.id).subscribe(() => {
        Materialize.toast('Deleted hotel', 4000, 'rounded');
        this.router.go('/hotels');
      }, () => {
        Materialize.toast('Error: Could not delete hotel', 4000, 'rounded');
      });
    }
  }
}
