import {Component, Input, ChangeDetectionStrategy} from '@angular/core';
import {Rating} from '../../../model/backend-typings';

@Component({
  selector: 'rating-new',
  directives: [],
  providers: [],
  template: require('./rating-new.component.html'),
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RatingNewComponent {
  @Input()
  rating: Rating = {};
}
