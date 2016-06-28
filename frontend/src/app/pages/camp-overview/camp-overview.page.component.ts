import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Camp} from '../../model/backend-typings';
import {CampService} from '../../shared/camp.service';
import {CampOverviewComponent} from '../../components/camp-overview/camp-overview.component';

@Component({
  selector: 'camp-overview-page',
  directives: [CampOverviewComponent],
  template: `
    <camp-overview 
        [camps]="camps | async">
    </camp-overview>
    `
})
export class CampOverviewPageComponent implements OnInit {

  camps: Observable<Camp[]>;

  constructor(private campService:CampService) {
  }

  ngOnInit() {
    this.camps = this.campService.getCamps();
  }
}
