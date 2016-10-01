import {Component, Input, ChangeDetectionStrategy} from '@angular/core';
import {Camp} from '../../model/backend-typings';
import {MaterializeDirective} from "angular2-materialize/dist/index"

@Component({
  selector: 'camp-overview',
  template: require('./camp-overview.component.html'),
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CampOverviewComponent {

  @Input()
  camps: Camp[];

}
