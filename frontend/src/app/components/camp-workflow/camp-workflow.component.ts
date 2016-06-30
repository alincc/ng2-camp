import {Component, Input} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Camp, Hotel} from '../../model/backend-typings';
import {MaterializeDirective} from 'angular2-materialize/dist/index';
import {CampBasicsComponent} from './camp-basics/camp-basics.component';
import {CampDateComponent} from './camp-date/camp-date.component';
import {CampBookComponent} from './camp-book/camp-book.component';
import {CampReviewComponent} from './camp-review/camp-review.component';
import {HotelOverviewComponent} from '../hotel-overview/hotel-overview.component';

@Component({
  selector: 'camp-workflow',
  directives: [MaterializeDirective, CampBasicsComponent, CampDateComponent, CampBookComponent, CampReviewComponent, HotelOverviewComponent],
  template: require('./camp-workflow.component.html'),
  styles: [
    require('./camp-workflow.component.scss')
  ]
})
export class CampWorkflowComponent {

  @Input()
  camp: Camp;

  @Input()
  hotels: Observable<Hotel[]>;

  @Input()
  step: number = 0;
}
