import {Component, Input} from '@angular/core';
import {Camp} from '../../../model/backend-typings';

@Component({
  selector: 'camp-basics',
  directives: [],
  template: require('./camp-basics.component.html')
})
export class CampBasicsComponent {

  @Input()
  camp: Camp;
}
