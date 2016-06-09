import {Component, Input, OnInit, OnDestroy} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Rating} from '../../../model/backend-typings';
import {RatingService} from '../../../shared/rating.service';
import {Subscription} from "rxjs/Rx";

@Component({
  selector: 'rating-list',
  directives: [],
  providers: [],
  template: require('./rating-list.component.html')
})
export class RatingListComponent implements OnInit, OnDestroy {

  @Input('hotelId') hotelId: Observable<number>;

  ratings: Observable<Rating[]>;

  private subscription: Subscription;

  constructor(private ratingService: RatingService) {
  }

  ngOnInit(): any {
    this.subscription = this.hotelId
      .filter(hotelId => !isNaN(hotelId))
      .subscribe(hotelId => this.ratings = this.ratingService.getByHotelId(hotelId));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
