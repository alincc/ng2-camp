import {Component, OnInit} from '@angular/core';
import {RouteParams, QueryParams} from '@ngrx/router';
import 'rxjs/add/operator/pluck';
import {Camp, Hotel} from '../../model/backend-typings';
import {Store} from '@ngrx/store';
import {AppState} from '../../reducers/index';
import {Observable} from 'rxjs/Observable';
import {CampService} from '../../shared/camp.service';
import {CampWorkflowComponent} from '../../components/camp-workflow/camp-workflow.component';

@Component({
  selector: 'camp-workflow-page',
  directives: [CampWorkflowComponent],
  template: `
    <camp-workflow 
        [camp]="camp | async"
        [hotels]="hotels"
        [step]="step | async">
    </camp-workflow>
    `
})
export class CampWorkflowPageComponent implements OnInit {

  camp: Observable<Camp>;
  hotels: Observable<Hotel[]>;
  step: Observable<number>;

  constructor(private routeParams: RouteParams,
              private queryParams: QueryParams,
              private campService: CampService,
              private store:Store<AppState>) {
  }

  ngOnInit() {
    let campId = this.routeParams.pluck<number>('campId');
    this.camp = campId
      .filter(campId => !isNaN(campId))
      .flatMap(campId => this.campService.getCamp(campId));
    this.step = this.queryParams.pluck<number>('step');
    this.hotels = this.store.select<Hotel[]>('hotels');
  }
}
