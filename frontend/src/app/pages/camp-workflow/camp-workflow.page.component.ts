import {Component, OnInit} from '@angular/core';
import {RouteParams, QueryParams} from '@ngrx/router';
import 'rxjs/add/operator/pluck';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/mergeMap';
import {Camp, Hotel} from '../../model/backend-typings';
import {Store} from '@ngrx/store';
import {AppState, getHotels} from '../../reducers/index';
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
    this.camp = this.routeParams.pluck<string>('campId')
      .distinctUntilChanged()
      .map(id => parseInt(id))
      .filter(campId => !isNaN(campId))
      .flatMap(campId => this.campService.getCamp(campId));
    this.step = this.queryParams.pluck<string>('step')
      .map(step => parseInt(step));
    this.hotels = this.store.let(getHotels());
  }
}
