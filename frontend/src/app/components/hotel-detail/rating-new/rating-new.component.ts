import {Component, Input} from '@angular/core';
import {Rating} from '../../../model/backend-typings';

@Component({
  selector: 'rating-new',
  directives: [],
  providers: [],
  template: require('./rating-new.component.html')
})
export class RatingNewComponent {
  rating: Rating = {};
}
