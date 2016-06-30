import {Component, Input} from '@angular/core';
import {Camp} from '../../model/backend-typings';

@Component({
  selector: 'camp-review',
  directives: [],
  template: require('./camp-review.component.html')
})
export class CampReviewComponent {

  @Input()
  camp: Camp;
}
