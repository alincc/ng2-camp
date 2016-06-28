import {Component, Input} from '@angular/core';
import {Camp, RequestStatus} from '../../model/backend-typings';

@Component({
  selector: 'camp-detail',
  directives: [],
  template: require('./camp-detail.component.html')
})
export class CampDetailComponent {

  @Input()
  camp: Camp;

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
