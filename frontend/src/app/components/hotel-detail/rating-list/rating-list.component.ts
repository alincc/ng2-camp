import {Component, Input} from '@angular/core';
import {Rating} from '../../../model/backend-typings';

@Component({
  selector: 'rating-list',
  directives: [],
  providers: [],
  template: require('./rating-list.component.html')
})
export class RatingListComponent {

  @Input()
  ratings: Rating[];
}
