import {Component, OnInit} from '@angular/core';
import {RouteParams} from '@ngrx/router';
import {Camp, RequestStatus} from '../../model/backend-typings';
import {CampService} from '../../shared/camp.service';
import {Subscription} from 'rxjs/Rx';

@Component({
  selector: 'camp-detail',
  directives: [],
  providers: [],
  pipes: [],
  template: require('./camp-detail.component.html')
})
export class CampDetailComponent implements OnInit {
  camp: Camp = {};

  private subscription: Subscription;

  constructor(private routeParams: RouteParams,
              private campService: CampService) {
  }

  ngOnInit() {
    let campId = this.routeParams.pluck<number>('campId');
    this.subscription = campId.filter(id => !isNaN(id))
      .flatMap((id: number) => this.campService.getCamp(id))
      .subscribe((camp: Camp) => {
        this.camp = camp;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
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
