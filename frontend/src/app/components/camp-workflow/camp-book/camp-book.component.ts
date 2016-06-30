import {Component, Input} from '@angular/core';
import {Camp} from '../../../model/backend-typings';

@Component({
  selector: 'camp-book',
  directives: [],
  template: require('./camp-book.component.html')
})
export class CampBookComponent {

  @Input()
  camp: Camp;
}
