import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Rating} from '../../../model/backend-typings';
import {RatingService} from '../../../shared/rating.service';

@Component({
  selector: 'rating-new',
  directives: [],
  providers: [],
  template: require('./rating-new.component.html')
})
export class RatingNewComponent implements OnInit {

  @Input('hotelId') hotelId: Observable<number>;

  private rating: Rating = {};

  constructor(private ratingService: RatingService) {
  }

  ngOnInit(): any {
    this.hotelId
      .filter(hotelId => !isNaN(hotelId))
      .subscribe(hotelId => this.rating.hotel = {id: hotelId});
  }

  saveRating() {
    this.ratingService.saveRating(this.rating)
      .subscribe(rating => console.log(rating));
  }
}
