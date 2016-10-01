import {Component, Input, ChangeDetectionStrategy} from '@angular/core';
import {Rating} from '../../../model/backend-typings';

@Component({
  selector: 'rating-list',
  template: require('./rating-list.component.html'),
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RatingListComponent {

  @Input()
  ratings: Rating[];
}
