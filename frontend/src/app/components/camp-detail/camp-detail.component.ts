import {Component, OnDestroy, Input} from '@angular/core';
import {Camp, RequestStatus} from '../../model/backend-typings';
import {TooltipWorkaround} from "../../shared/tooltip/tooltip-workaround";

@Component({
  selector: 'camp-detail',
  directives: [],
  template: require('./camp-detail.component.html')
})
export class CampDetailComponent implements OnDestroy {

  @Input()
  camp: Camp;

  ngOnDestroy() {
    TooltipWorkaround.removeTooltipsFromDom();
  }

  getStatusColor(status:RequestStatus) {
    switch (status) {
      case 'REQUEST_SENT':
      case 'WAITING_FOR_CLARIFCATION':
        return 'yellow accent-1';
      case 'OFFER_CONFIRMED':
        return 'light-green accent-1';
      case 'OFFER_DECLINED':
        return 'red accent-1';
      default:
        return 'light-blue accent-1';
    }
  }
}
