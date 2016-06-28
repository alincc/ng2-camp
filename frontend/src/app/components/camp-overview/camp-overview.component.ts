import {Component, Input, OnDestroy} from '@angular/core';
import {Camp} from '../../model/backend-typings';
import {MaterializeDirective} from "angular2-materialize/dist/index"
import {TooltipWorkaround} from "../../shared/tooltip/tooltip-workaround";

@Component({
  selector: 'camp-overview',
  directives: [MaterializeDirective],
  template: require('./camp-overview.component.html')
})
export class CampOverviewComponent implements OnDestroy {

  @Input()
  camps: Camp[];

  ngOnDestroy() {
    TooltipWorkaround.removeTooltipsFromDom();
  }

}
