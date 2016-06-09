import {Component, Input, OnInit, OnDestroy} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Rating} from '../../../model/backend-typings';
import {RatingService} from '../../../shared/rating.service';
import {Subscription} from "rxjs/Rx";

@Component({
  selector: 'rating-new',
  directives: [],
  providers: [],
  template: require('./rating-new.component.html')
})
export class RatingNewComponent implements OnInit, OnDestroy {

  @Input('hotelId') hotelId: Observable<number>;
  private hotelIdNumber: number;

  private rating: Rating = {};

  private subscription: Subscription;

  constructor(private ratingService: RatingService) {
  }

  ngOnInit(): any {
    this.subscription = this.hotelId
      .filter(hotelId => !isNaN(hotelId))
      .subscribe(id => this.hotelIdNumber = id);
  }

  saveRating() {
    this.ratingService.saveRating(this.rating, this.hotelIdNumber)
      .subscribe(rating => console.log(rating));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
