import {Component, OnInit} from '@angular/core';
import 'rxjs/add/operator/pluck';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/mergeMap';
import {Camp, Hotel} from '../../model/backend-typings';
import {Store} from '@ngrx/store';
import {AppState, getHotels, getCamp} from '../../reducers/index';
import {Observable} from 'rxjs/Observable';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'camp-workflow-page',
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

  constructor(private route: ActivatedRoute,
              private store:Store<AppState>) {
  }

  ngOnInit() {
   this.camp = this.route.params
      .pluck<string>('campId')
      .distinctUntilChanged()
      .map(campId => parseInt(campId))
      .flatMap(campId => this.store.let(getCamp(campId)));
    this.step = this.route.queryParams.pluck<string>('step')
      .map(step => parseInt(step));
    this.hotels = this.store.let(getHotels());
  }
}
