import {Component, OnInit} from '@angular/core';
import {RouteParams} from '@ngrx/router';
import 'rxjs/add/operator/pluck';
import {Camp} from '../../model/backend-typings';
import {Observable} from 'rxjs/Observable';
import {CampService} from '../../shared/camp.service';
import {CampDetailComponent} from '../../components/camp-detail/camp-detail.component';

@Component({
  selector: 'camp-detail-page',
  directives: [CampDetailComponent],
  template: `
    <camp-detail 
        [camp]="camp | async">
    </camp-detail>
    `
})
export class CampDetailPageComponent implements OnInit {

  camp: Observable<Camp>;

  constructor(private routeParams: RouteParams,
              private campService: CampService) {
  }

  ngOnInit() {
    let campId = this.routeParams.pluck<number>('campId');
    this.camp = campId
      .filter(campId => !isNaN(campId))
      .flatMap(campId => this.campService.getCamp(campId));
  }
}
