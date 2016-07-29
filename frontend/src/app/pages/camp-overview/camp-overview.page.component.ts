import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Camp} from '../../model/backend-typings';
import {CampOverviewComponent} from '../../components/camp-overview/camp-overview.component';
import {Store} from "@ngrx/store";
import {AppState, getCamps} from "../../reducers";

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

  constructor(private store:Store<AppState>) {
  }

  ngOnInit() {
    this.camps = this.store.let(getCamps());
  }
}
