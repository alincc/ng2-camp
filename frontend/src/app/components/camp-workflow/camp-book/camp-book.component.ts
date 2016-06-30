import {Component, Input} from '@angular/core';
import {Camp} from '../../../model/backend-typings';
import {MaterializeDirective} from 'angular2-materialize/dist/index';

@Component({
  selector: 'camp-book',
  directives: [MaterializeDirective],
  template: require('./camp-book.component.html')
})
export class CampBookComponent {

  @Input()
  camp: Camp;
}
