import {Component, OnInit, OnDestroy} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Camp} from '../../model/backend-typings';
import {CampService} from '../../shared/camp.service';
import {MaterializeDirective} from "angular2-materialize/dist/index"
import {TooltipWorkaround} from "../../shared/tooltip/tooltip-workaround";

@Component({
  selector: 'camps',
  directives: [MaterializeDirective],
  template: require('./camp-overview.component.html')
})
export class CampOverviewComponent implements OnInit, OnDestroy {
  camps: Observable<Camp[]>;

  constructor(private campService:CampService) {
  }

  ngOnInit() {
    this.camps = this.campService.getCamps();
  }

  ngOnDestroy() {
    TooltipWorkaround.removeTooltipsFromDom();
  }

}
