import {Component, OnInit} from "@angular/core";
import {RouteParams, Router} from '@ngrx/router';
import {Camp} from "../../model/backend-typings";
import {CampService} from "../../shared/camp.service";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'camp-detail',
  directives: [],
  providers: [],
  pipes: [],
  template: require('./camp-detail.component.html')
})
export class CampDetailComponent implements OnInit {
  camp:Camp = {};

  constructor(private routeParams:RouteParams,
              private campService:CampService) {
  }

  ngOnInit() {
    let id = this.routeParams.pluck<number>('id');
    id
      .filter(id => !isNaN(id))
      .flatMap((id:number) => this.campService.getCamp(id))
      .subscribe((camp:Camp) => {
        this.camp = camp;
      });
  }
}
