import {Component, Input, ChangeDetectionStrategy} from '@angular/core';
import {Camp} from '../../../model/backend-typings';

@Component({
  selector: 'camp-basics',
  template: require('./camp-basics.component.html'),
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CampBasicsComponent {

  @Input()
  camp: Camp;
}
