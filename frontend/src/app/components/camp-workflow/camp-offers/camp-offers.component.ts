import {Component, Input} from '@angular/core';
import {Camp} from '../../../model/backend-typings';
import {MaterializeDirective} from 'angular2-materialize/dist/index';

@Component({
  selector: 'camp-offers',
  directives: [MaterializeDirective],
  template: require('./camp-offers.component.html')
})
export class CampOffersComponent {

  @Input()
  camp: Camp;
}
